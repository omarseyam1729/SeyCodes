import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, BookOpen, Zap, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Arrays() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <Link to="/" className="text-primary hover:underline text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4 ml-4">
            <BookOpen className="w-4 h-4" />
            <span>Data Structures</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Arrays</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            The fundamental building block of data structures.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Zap, label: 'Access', value: 'O(1)' },
            { icon: Clock, label: 'Search', value: 'O(n)' },
            { icon: Clock, label: 'Insert', value: 'O(n)' },
            { icon: Clock, label: 'Delete', value: 'O(n)' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl glass border border-white/10 text-center">
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-lg font-mono font-bold text-primary">{stat.value}</div>
            </div>
          ))}
        </div>
      
        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              An array is a collection of elements stored at contiguous memory locations. It is one of the
              most fundamental data structures in computer science. Arrays provide constant-time access 
              to elements by index, making them extremely efficient for random access operations.
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-accent" />
              </div>
              Key Characteristics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                'Elements are stored in contiguous memory locations',
                'Access time is O(1) for any element',
                'Size is fixed (in most languages) or dynamic',
                'Index-based access starting from 0'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 animate-fade-in stagger-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-emerald-400" />
              </div>
              Example Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl bg-background/50 border border-white/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-secondary/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">arrays.js</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-muted-foreground">
{`// JavaScript example
const arr = [1, 2, 3, 4, 5];

// Access element - O(1)
console.log(arr[0]); // 1

// Modify element - O(1)
arr[2] = 10;

// Iterate through array - O(n)
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// Array methods
arr.push(6);     // Add to end
arr.pop();       // Remove from end
arr.unshift(0);  // Add to beginning
arr.shift();     // Remove from beginning`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <div />
          <Link to="/learn/linkedlists">
            <Button variant="outline" className="glass-hover">
              Next: Linked Lists →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
