import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, BookOpen, Zap, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Queues() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <Link to="/" className="text-primary hover:underline text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4 ml-4">
            <BookOpen className="w-4 h-4" />
            <span>Data Structures</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">Queues</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            First In, First Out (FIFO) data structure.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Enqueue', value: 'O(1)' },
            { label: 'Dequeue', value: 'O(1)' },
            { label: 'Front', value: 'O(1)' },
            { label: 'Search', value: 'O(n)' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl glass border border-white/10 text-center">
              <Zap className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-lg font-mono font-bold text-emerald-400">{stat.value}</div>
            </div>
          ))}
        </div>
      
        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-emerald-400" />
              </div>
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              A queue is a linear data structure that follows the First In First Out (FIFO) principle.
              Elements are added at the rear and removed from the front. Think of it like a line of 
              people waiting - the first person in line is the first to be served.
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <ArrowRightLeft className="w-4 h-4 text-green-400" />
              </div>
              Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { name: 'Enqueue', desc: 'Add an element to the rear' },
                { name: 'Dequeue', desc: 'Remove an element from the front' },
                { name: 'Front', desc: 'Get the front element' },
                { name: 'isEmpty', desc: 'Check if queue is empty' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <div>
                    <strong className="text-foreground">{item.name}:</strong> {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 animate-fade-in stagger-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-cyan-400" />
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
                <span className="text-xs text-muted-foreground font-mono">queue.js</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-muted-foreground">
{`// JavaScript example
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }
  
  front() {
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Link to="/learn/stacks">
            <Button variant="outline" className="glass-hover">
              ← Previous: Stacks
            </Button>
          </Link>
          <Link to="/learn/trees">
            <Button variant="outline" className="glass-hover">
              Next: Trees →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
