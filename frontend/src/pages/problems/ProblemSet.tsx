import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { problemsApi } from '@/lib/api';
import type { Problem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code2, ArrowRight, Zap, Target, Trophy } from 'lucide-react';

export default function ProblemSet() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await problemsApi.getAll();
        setProblems(response.problems);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load problems');
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30', icon: Zap };
      case 'medium':
        return { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30', icon: Target };
      case 'hard':
        return { color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/30', icon: Trophy };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted/10', border: 'border-muted/30', icon: Code2 };
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="glass border-white/10 animate-pulse">
              <CardHeader>
                <div className="h-6 bg-secondary rounded w-3/4 mb-2" />
                <div className="h-4 bg-secondary rounded w-1/4" />
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-secondary rounded mb-4" />
                <div className="h-10 bg-secondary rounded w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="glass border-destructive/30 max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="text-destructive mb-4">{error}</div>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-primary text-sm font-medium mb-4">
            <Code2 className="w-4 h-4" />
            <span>Practice Makes Perfect</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Problem <span className="gradient-text">Set</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Challenge yourself with our curated collection of coding problems. 
            Start with easy ones and work your way up!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg">
          {['Easy', 'Medium', 'Hard'].map((diff) => {
            const config = getDifficultyConfig(diff);
            const count = problems.filter(p => p.difficulty.toLowerCase() === diff.toLowerCase()).length;
            return (
              <div key={diff} className={`p-4 rounded-xl glass ${config.border} border text-center`}>
                <div className={`text-2xl font-bold ${config.color}`}>{count}</div>
                <div className="text-sm text-muted-foreground">{diff}</div>
              </div>
            );
          })}
        </div>

        {/* Problems Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => {
            const config = getDifficultyConfig(problem.difficulty);
            const DiffIcon = config.icon;
            
            return (
              <Card 
                key={problem.problemId} 
                className="glass border-white/10 group hover:border-primary/30 transition-all duration-500 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${config.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {problem.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} ${config.border} border`}>
                          <DiffIcon className="w-3 h-3" />
                          {problem.difficulty}
                        </span>
                      </CardDescription>
                    </div>
                    <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                      <span className="text-lg font-bold text-muted-foreground">#{problem.problemId}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                    {problem.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                  <Link to={`/problems/${problem.problemId}`}>
                    <Button className="w-full group/btn bg-secondary hover:bg-secondary/80">
                      Solve Problem
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {problems.length === 0 && (
          <Card className="glass border-white/10 max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No problems available yet. Check back soon!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
