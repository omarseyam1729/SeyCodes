import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Zap, Users, Code2, BookOpen, MessageSquare, Heart, Rocket } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Learning',
      description: 'Comprehensive guides on data structures and algorithms with clear explanations and examples.',
      color: 'from-cyan-500 to-teal-500'
    },
    {
      icon: Code2,
      title: 'Problem Solving',
      description: 'Practice with our curated problem set covering various difficulty levels.',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Code Editor',
      description: 'Write and test code in multiple languages with instant feedback.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Discuss problems and share knowledge with fellow developers.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Heart,
      title: 'Save Favorites',
      description: 'Bookmark your favorite posts for quick access later.',
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: Rocket,
      title: 'Track Progress',
      description: 'Monitor your learning journey and see how far you\'ve come.',
      color: 'from-emerald-500 to-green-500'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-primary text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            <span>Our Mission</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            About <span className="gradient-text">SeyCodes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            SeyCodes is a comprehensive platform designed to help you master data structures and algorithms.
            Whether you're preparing for technical interviews, learning computer science fundamentals, or
            just want to improve your problem-solving skills, we've got you covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, i) => (
            <Card 
              key={i} 
              className="glass border-white/10 group hover:border-primary/30 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <Card className="glass border-white/10 overflow-hidden mb-16">
          <div className="grid md:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-4">
                Why <span className="gradient-text">SeyCodes</span>?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We believe that everyone should have access to quality computer science education.
                  That's why SeyCodes is completely free and always will be.
                </p>
                <p>
                  Our platform combines structured learning with hands-on practice, allowing you to
                  understand concepts deeply and apply them immediately.
                </p>
                <p>
                  Join our community of learners and take your coding skills to the next level.
                </p>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 p-8 lg:p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl font-bold gradient-text mb-2">100%</div>
                <div className="text-xl text-muted-foreground">Free Forever</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Get Started */}
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Create an account to start your journey. Practice problems, learn new concepts,
            and engage with the community. Happy coding!
          </p>
          <div className="inline-flex items-center gap-2 text-primary">
            <Code2 className="w-5 h-5" />
            <span className="font-mono text-sm">console.log("Let's code!");</span>
          </div>
        </div>
      </div>
    </div>
  );
}
