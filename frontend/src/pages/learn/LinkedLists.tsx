import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LinkedLists() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Linked Lists</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            A linked list is a linear data structure where elements are not stored at contiguous memory
            locations. Each element (node) contains a data field and a reference (link) to the next node.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Types of Linked Lists</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Singly Linked List:</strong> Each node points to the next node</li>
            <li><strong>Doubly Linked List:</strong> Each node points to both next and previous nodes</li>
            <li><strong>Circular Linked List:</strong> Last node points back to the first node</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Time Complexity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Access:</strong> O(n) - Must traverse from head</li>
            <li><strong>Search:</strong> O(n) - Linear search</li>
            <li><strong>Insertion:</strong> O(1) - At head, O(n) at end</li>
            <li><strong>Deletion:</strong> O(1) - At head, O(n) at end</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
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
        </CardContent>
      </Card>
    </div>
  );
}

