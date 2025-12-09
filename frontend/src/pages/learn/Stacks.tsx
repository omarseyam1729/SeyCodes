import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, BookOpen, Zap, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Stacks() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <Link to="/" className="text-primary hover:underline text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-amber-500/30 text-amber-400 text-sm font-medium mb-4 ml-4">
            <BookOpen className="w-4 h-4" />
            <span>Data Structures</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">Stacks</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Last In, First Out (LIFO) data structure.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Push', value: 'O(1)' },
            { label: 'Pop', value: 'O(1)' },
            { label: 'Peek', value: 'O(1)' },
            { label: 'Search', value: 'O(n)' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl glass border border-white/10 text-center">
              <Zap className="w-5 h-5 text-amber-400 mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-lg font-mono font-bold text-amber-400">{stat.value}</div>
            </div>
          ))}
        </div>
      
        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-amber-400" />
              </div>
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              A stack is a linear data structure that follows the Last In First Out (LIFO) principle.
              Elements are added and removed from the same end, called the "top" of the stack.
              Think of it like a stack of plates - you can only add or remove from the top.
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Layers className="w-4 h-4 text-orange-400" />
              </div>
              Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { name: 'Push', desc: 'Add an element to the top' },
                { name: 'Pop', desc: 'Remove the top element' },
                { name: 'Peek/Top', desc: 'View the top element without removing it' },
                { name: 'isEmpty', desc: 'Check if stack is empty' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
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
                <span className="text-xs text-muted-foreground font-mono">stack.js</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-muted-foreground">
{`// JavaScript example
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }
  
  peek() {
    return this.items[this.items.length - 1];
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
          <Link to="/learn/linkedlists">
            <Button variant="outline" className="glass-hover">
              ← Previous: Linked Lists
            </Button>
          </Link>
          <Link to="/learn/queues">
            <Button variant="outline" className="glass-hover">
              Next: Queues →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
