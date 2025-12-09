import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Arrays() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Arrays</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            An array is a collection of elements stored at contiguous memory locations. It is one of the
            most fundamental data structures in computer science.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Characteristics</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Elements are stored in contiguous memory locations</li>
            <li>Access time is O(1) for any element</li>
            <li>Size is fixed (in most languages) or dynamic</li>
            <li>Index-based access starting from 0</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Common Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Access:</strong> O(1) - Direct access by index</li>
            <li><strong>Search:</strong> O(n) - Linear search through elements</li>
            <li><strong>Insertion:</strong> O(n) - May need to shift elements</li>
            <li><strong>Deletion:</strong> O(n) - May need to shift elements</li>
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
const arr = [1, 2, 3, 4, 5];

// Access element
console.log(arr[0]); // 1

// Modify element
arr[2] = 10;

// Iterate
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

