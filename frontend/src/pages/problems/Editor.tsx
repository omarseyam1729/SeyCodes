import { useState } from 'react';
import { problemsApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Play, Terminal, Loader2 } from 'lucide-react';

interface EditorProps {
  problemId?: number;
}

export default function Editor({ problemId: _problemId }: EditorProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!code.trim()) {
      setOutput('Please enter some code');
      return;
    }

    setLoading(true);
    setOutput('Running...');

    try {
      const response = await problemsApi.runCode(code, language);
      setOutput(response.output || 'No output');
    } catch (err: any) {
      setOutput(err.response?.data?.error || 'Error running code');
    } finally {
      setLoading(false);
    }
  };

  const getLanguageIcon = () => {
    switch (language) {
      case 'javascript':
        return '🟨';
      case 'python':
        return '🐍';
      case 'cpp':
        return '⚡';
      default:
        return '📝';
    }
  };

  return (
    <Card className="glass border-white/10 overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-secondary/30">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <CardTitle>Code Editor</CardTitle>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full sm:w-40 bg-secondary/50 border-white/10">
                <span className="mr-2">{getLanguageIcon()}</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border-white/10">
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleRun} 
              disabled={loading}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-background font-semibold"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span className="ml-2 hidden sm:inline">{loading ? 'Running...' : 'Run'}</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {/* Code Input */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="font-mono">main.{language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : 'js'}</span>
            </div>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`// Enter your ${language} code here...\n\n// Example:\nconsole.log("Hello, World!");`}
              className="font-mono min-h-[400px] bg-background/50 border-white/10 resize-none text-sm leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="p-4 bg-background/30">
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
              <Terminal className="w-4 h-4" />
              <span className="font-mono">Output</span>
            </div>
            <div className="min-h-[400px] p-4 rounded-lg bg-background/50 border border-white/10 font-mono text-sm">
              {output ? (
                <pre className="whitespace-pre-wrap text-foreground">{output}</pre>
              ) : (
                <span className="text-muted-foreground italic">
                  Run your code to see the output here...
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
