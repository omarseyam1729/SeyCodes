import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Graphs() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Graphs</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            A graph is a data structure consisting of vertices (nodes) and edges that connect them.
            Graphs are used to represent networks, relationships, and connections.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Types of Graphs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Directed Graph:</strong> Edges have direction</li>
            <li><strong>Undirected Graph:</strong> Edges have no direction</li>
            <li><strong>Weighted Graph:</strong> Edges have weights/costs</li>
            <li><strong>Unweighted Graph:</strong> All edges have equal weight</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Representation</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Adjacency Matrix:</strong> 2D array representation</li>
            <li><strong>Adjacency List:</strong> Array of lists representation</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Common Algorithms</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Depth-First Search (DFS)</li>
            <li>Breadth-First Search (BFS)</li>
            <li>Dijkstra's Algorithm (shortest path)</li>
            <li>Topological Sort</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
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
        </CardContent>
      </Card>
    </div>
  );
}

