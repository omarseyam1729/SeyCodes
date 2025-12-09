const { NodeVM } = require('vm2');
const { exec } = require('child_process');
const prisma = require('../lib/prisma');
const fs = require('fs');
const path = require('path');

const runCode = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { code, language } = req.body;
  
  if (!code || !language) {
    return res.status(400).json({ error: 'Code and language are required' });
  }

  let command;
  let tempFile;

  switch (language) {
    case 'javascript':
      try {
        const vm = new NodeVM({
          timeout: 2000, 
          sandbox: {},
          eval: false,
          wasm: false,
          require: false
        });
        const result = vm.run(code, {
          timeout: 2000, 
          execArgv: ['--max-old-space-size=256'] 
        });
        return res.json({ output: result ? result.toString() : 'undefined' });
      } catch (err) {
        return res.json({ output: err.message });
      }

    case 'python':
      tempFile = path.join('/tmp', `temp_${Date.now()}.py`);
      fs.writeFileSync(tempFile, code);
      command = `docker run --rm --memory=256m --cpus="1" --ulimit cpu=2 -v ${tempFile}:/temp.py python:3.9 python /temp.py`;
      break;

    case 'cpp':
      tempFile = path.join('/tmp', `temp_${Date.now()}.cpp`);
      fs.writeFileSync(tempFile, code);
      command = `docker run --rm --memory=256m --cpus="1" --ulimit cpu=2 -v ${tempFile}:/temp.cpp gcc:latest sh -c "g++ /temp.cpp -o /tmp/a.out && /tmp/a.out"`;
      break;

    default:
      return res.status(400).json({ error: 'Unsupported language' });
  }

  exec(command, { timeout: 2000 }, (error, stdout, stderr) => {
    // Clean up temp file
    if (tempFile && fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
    
    if (error) {
      return res.json({ output: stderr || error.message });
    }
    res.json({ output: stdout });
  });
};

const problemSet = async (req, res) => {
  try {
    const problems = await prisma.problem.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    // Map id to problemId for frontend compatibility
    const formattedProblems = problems.map(p => ({
      problemId: p.id,
      title: p.title,
      description: p.description,
      difficulty: p.difficulty,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    }));
    
    res.json({ problems: formattedProblems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const getProblem = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const problemId = parseInt(req.params.problemId);
  try {
    const problem = await prisma.problem.findUnique({
      where: { id: problemId }
    });
    
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    
    // Map id to problemId for frontend compatibility
    res.json({
      problemId: problem.id,
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      createdAt: problem.createdAt,
      updatedAt: problem.updatedAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { runCode, problemSet, getProblem };
