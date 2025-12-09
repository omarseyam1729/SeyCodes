import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, BookOpen, Zap, Clock, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LinkedLists() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <Link to="/" className="text-primary hover:underline text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/30 text-violet-400 text-sm font-medium mb-4 ml-4">
            <BookOpen className="w-4 h-4" />
            <span>Data Structures</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-purple">Linked Lists</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Dynamic data structure with efficient insertions and deletions.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Clock, label: 'Access', value: 'O(n)' },
            { icon: Clock, label: 'Search', value: 'O(n)' },
            { icon: Zap, label: 'Insert', value: 'O(1)*' },
            { icon: Zap, label: 'Delete', value: 'O(1)*' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl glass border border-white/10 text-center">
              <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-lg font-mono font-bold text-accent">{stat.value}</div>
            </div>
          ))}
        </div>
      
        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-accent" />
              </div>
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              A linked list is a linear data structure where elements are not stored at contiguous memory
              locations. Each element (node) contains a data field and a reference (link) to the next node.
              This structure allows for efficient insertion and deletion operations.
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                <LinkIcon className="w-4 h-4 text-pink-400" />
              </div>
              Types of Linked Lists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { name: 'Singly Linked List', desc: 'Each node points to the next node' },
                { name: 'Doubly Linked List', desc: 'Each node points to both next and previous nodes' },
                { name: 'Circular Linked List', desc: 'Last node points back to the first node' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
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
                <span className="text-xs text-muted-foreground font-mono">linkedlist.js</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-muted-foreground">
{`// JavaScript example
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Link to="/learn/arrays">
            <Button variant="outline" className="glass-hover">
              ← Previous: Arrays
            </Button>
          </Link>
          <Link to="/learn/stacks">
            <Button variant="outline" className="glass-hover">
              Next: Stacks →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
