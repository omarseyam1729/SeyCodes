import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { problemsApi } from '@/lib/api';
import type { Problem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Editor from './Editor';

export default function ProblemDetail() {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      if (!problemId) return;

      try {
        const problem = await problemsApi.getById(parseInt(problemId));
        setProblem(problem);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load problem');
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'hard':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading problem...</div>;
  }

  if (error || !problem) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-red-600 mb-4">{error || 'Problem not found'}</div>
        <Button onClick={() => navigate('/problems')}>Back to Problems</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate('/problems')}>
          ← Back to Problems
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{problem.title}</CardTitle>
              <CardDescription>
                <span className={getDifficultyColor(problem.difficulty)}>
                  {problem.difficulty}
                </span>
              </CardDescription>
            </div>
            <Button onClick={() => setShowEditor(!showEditor)}>
              {showEditor ? 'Hide Editor' : 'Show Editor'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{problem.description}</p>
          </div>
        </CardContent>
      </Card>

      {showEditor && <Editor problemId={problem.problemId} />}
    </div>
  );
}

