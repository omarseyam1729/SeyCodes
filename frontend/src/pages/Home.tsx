import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Code2, MessageSquare, Sparkles, Zap, Users, ArrowRight, Terminal } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-violet-500/10 to-transparent rounded-full blur-3xl animate-float stagger-2" />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Level up your coding skills</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 animate-fade-in stagger-1">
              Master{' '}
              <span className="gradient-text">Algorithms</span>
              <br />
              <span className="gradient-text-purple">Build Confidence</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in stagger-2">
              Learn data structures and algorithms through interactive lessons, 
              solve challenging problems, and grow with a supportive community.
            </p>
            
            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-3">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-background font-semibold text-lg px-8 glow">
                    Start Learning Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="glass-hover text-lg px-8">
                    Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-3">
                <Link to="/problems">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-background font-semibold text-lg px-8 glow">
                    <Terminal className="w-5 h-5 mr-2" />
                    Solve Problems
                  </Button>
                </Link>
                <Link to="/discussion">
                  <Button size="lg" variant="outline" className="glass-hover text-lg px-8">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Join Discussion
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-in stagger-4">
            {[
              { value: '50+', label: 'Problems' },
              { value: '6', label: 'Topics' },
              { value: '3', label: 'Languages' },
              { value: '∞', label: 'Possibilities' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl glass">
                <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Everything you need to{' '}
              <span className="gradient-text">excel</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete platform designed to take you from beginner to confident problem solver.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass border-white/10 group hover:border-primary/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-7 h-7 text-background" />
                </div>
                <CardTitle className="text-2xl">Learn</CardTitle>
                <CardDescription className="text-base">
                  Comprehensive guides on essential data structures
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-3 mb-6">
                  {['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & Graphs'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/learn/arrays">
                  <Button variant="ghost" className="group/btn">
                    Start Learning
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass border-white/10 group hover:border-accent/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-2xl">Practice</CardTitle>
                <CardDescription className="text-base">
                  Solve curated problems with real-time feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-3 mb-6">
                  {['JavaScript Support', 'Python Support', 'C++ Support', 'Instant Execution'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <Zap className="w-4 h-4 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                {user ? (
                  <Link to="/problems">
                    <Button variant="ghost" className="group/btn">
                      View Problems
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button variant="ghost" className="group/btn">
                      Login to Practice
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            <Card className="glass border-white/10 group hover:border-pink-500/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-2xl">Discuss</CardTitle>
                <CardDescription className="text-base">
                  Connect with fellow learners and share knowledge
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-3 mb-6">
                  {['Ask Questions', 'Share Solutions', 'Get Help', 'Build Community'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <MessageSquare className="w-4 h-4 text-pink-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                {user ? (
                  <Link to="/discussion">
                    <Button variant="ghost" className="group/btn">
                      Join Forum
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button variant="ghost" className="group/btn">
                      Login to Discuss
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
              <div className="relative py-16 px-8 md:py-20 md:px-16 text-center">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                  Ready to start your journey?
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of developers mastering algorithms and data structures.
                </p>
                <Link to="/register">
                  <Button size="lg" className="bg-white text-teal-600 hover:bg-white/90 font-semibold text-lg px-8">
                    Create Free Account
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
