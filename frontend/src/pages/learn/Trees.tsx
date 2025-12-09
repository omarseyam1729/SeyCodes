import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, BookOpen, TreeDeciduous, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Trees() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <Link to="/" className="text-primary hover:underline text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-rose-500/30 text-rose-400 text-sm font-medium mb-4 ml-4">
            <BookOpen className="w-4 h-4" />
            <span>Data Structures</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-400">Trees</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Hierarchical data structure with root and child nodes.
          </p>
        </div>
      
        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-rose-400" />
              </div>
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              A tree is a hierarchical data structure consisting of nodes connected by edges. Each tree has
              a root node and child nodes. Trees are used to represent hierarchical relationships and are
              fundamental in many algorithms and data structures.
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                <TreeDeciduous className="w-4 h-4 text-pink-400" />
              </div>
              Key Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { name: 'Root', desc: 'The topmost node' },
                { name: 'Parent', desc: 'A node with child nodes' },
                { name: 'Child', desc: 'A node connected to a parent' },
                { name: 'Leaf', desc: 'A node with no children' },
                { name: 'Height', desc: 'Length of longest path from root to leaf' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                  <div>
                    <strong className="text-foreground">{item.name}:</strong> {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-fuchsia-400" />
              </div>
              Types of Trees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { name: 'Binary Tree', desc: 'Each node has at most 2 children' },
                { name: 'Binary Search Tree', desc: 'Left child < parent < right child' },
                { name: 'AVL Tree', desc: 'Self-balancing BST' },
                { name: 'Heap', desc: 'Complete binary tree with heap property' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 mt-2 shrink-0" />
                  <div>
                    <strong className="text-foreground">{item.name}:</strong> {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 animate-fade-in stagger-4">
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
                <span className="text-xs text-muted-foreground font-mono">tree.js</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-muted-foreground">
{`// JavaScript example - Binary Tree Node
class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// In-order traversal
function inOrder(node) {
  if (node) {
    inOrder(node.left);
    console.log(node.data);
    inOrder(node.right);
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Link to="/learn/queues">
            <Button variant="outline" className="glass-hover">
              ← Previous: Queues
            </Button>
          </Link>
          <Link to="/learn/graphs">
            <Button variant="outline" className="glass-hover">
              Next: Graphs →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
