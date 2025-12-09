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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Code Editor</CardTitle>
          <div className="flex gap-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleRun} disabled={loading}>
              {loading ? 'Running...' : 'Run Code'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code here..."
            className="font-mono min-h-[300px]"
          />
          {output && (
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="font-semibold mb-2">Output:</h3>
              <pre className="whitespace-pre-wrap text-sm">{output}</pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

