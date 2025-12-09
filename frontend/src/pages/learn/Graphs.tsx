import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, BookOpen, Share2, Route } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Graphs() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <Link to="/" className="text-primary hover:underline text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-400 text-sm font-medium mb-4 ml-4">
            <BookOpen className="w-4 h-4" />
            <span>Data Structures</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Graphs</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Vertices and edges representing relationships and networks.
          </p>
        </div>
      
        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-400" />
              </div>
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              A graph is a data structure consisting of vertices (nodes) and edges that connect them.
              Graphs are used to represent networks, relationships, and connections. They are fundamental
              in solving problems like shortest paths, network flow, and social network analysis.
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 mb-6 animate-fade-in stagger-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-indigo-400" />
              </div>
              Types of Graphs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { name: 'Directed Graph', desc: 'Edges have direction' },
                { name: 'Undirected Graph', desc: 'Edges have no direction' },
                { name: 'Weighted Graph', desc: 'Edges have weights/costs' },
                { name: 'Unweighted Graph', desc: 'All edges have equal weight' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
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
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <Route className="w-4 h-4 text-violet-400" />
              </div>
              Common Algorithms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                'Depth-First Search (DFS)',
                'Breadth-First Search (BFS)',
                'Dijkstra\'s Algorithm (shortest path)',
                'Topological Sort',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                  {item}
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
                <span className="text-xs text-muted-foreground font-mono">graph.js</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-muted-foreground">
{`// JavaScript example - Adjacency List
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }
  
  dfs(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;
    
    (function dfsHelper(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          return dfsHelper(neighbor);
        }
      });
    })(start);
    
    return result;
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Link to="/learn/trees">
            <Button variant="outline" className="glass-hover">
              ← Previous: Trees
            </Button>
          </Link>
          <Link to="/problems">
            <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-background font-semibold">
              Start Practicing →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
