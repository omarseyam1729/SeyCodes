const { NodeVM } = require('vm2');
const { exec } = require('child_process');
const { Problem } = require('../models');
const fs = require('fs');
const path = require('path');

const editor = (req, res) => {
    console.log(req.user);
    if(!req.user)res.render('auth/login',{user:req.user});
    res.render('editor/editor', { user: req.user });
};

const runCode = (req, res) => {
    if(!req.user)res.render('auth/login');
    const { code, language } = req.body;
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
                return res.json({ output: result.toString() });
            } catch (err) {
                return res.json({ output: err.message });
            }

        case 'python':
            tempFile = path.join('/tmp', `temp.py`);
            fs.writeFileSync(tempFile, code);
            command = `docker run --rm --memory=256m --cpus="1" --ulimit cpu=2 -v ${tempFile}:/temp.py python:3.9 python /temp.py`;
            break;

        case 'cpp':
            tempFile = path.join('/tmp', `temp.cpp`);
            fs.writeFileSync(tempFile, code);
            command = `docker run --rm --memory=256m --cpus="1" --ulimit cpu=2 -v ${tempFile}:/temp.cpp gcc:latest sh -c "g++ /temp.cpp -o /tmp/a.out && /tmp/a.out"`;
            break;

        default:
            return res.json({ output: 'Unsupported language' });
    }

    exec(command, { timeout: 2000 }, (error, stdout, stderr) => { 
        
        if (error) {
            return res.json({ output: stderr || error.message });
        }
        res.json({ output: stdout });
    });
};
const problemSet = async (req, res) => {
    try {
      const problems = await Problem.findAll();
      res.render('problems/problemSet', { user:req.user,problems });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
const getProblem = async (req,res) => {
    
    if(!req.user)res.render('auth/login',{user:req.user});
    const problemId=req.params.problemId;
    const problem=await Problem.findByPk(problemId);
    console.log(problem);
    res.json(problem);
}
module.exports = { runCode, editor,problemSet,getProblem };
