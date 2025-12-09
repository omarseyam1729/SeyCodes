import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Trees() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Trees</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            A tree is a hierarchical data structure consisting of nodes connected by edges. Each tree has
            a root node and child nodes. Trees are used to represent hierarchical relationships.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Root:</strong> The topmost node</li>
            <li><strong>Parent:</strong> A node with child nodes</li>
            <li><strong>Child:</strong> A node connected to a parent</li>
            <li><strong>Leaf:</strong> A node with no children</li>
            <li><strong>Height:</strong> Length of longest path from root to leaf</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Types of Trees</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Binary Tree:</strong> Each node has at most 2 children</li>
            <li><strong>Binary Search Tree:</strong> Left child &lt; parent &lt; right child</li>
            <li><strong>AVL Tree:</strong> Self-balancing BST</li>
            <li><strong>Heap:</strong> Complete binary tree with heap property</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
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
        </CardContent>
      </Card>
    </div>
  );
}

