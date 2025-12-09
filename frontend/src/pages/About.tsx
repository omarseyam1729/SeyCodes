import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function About() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">About SeyCodes</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            SeyCodes is a comprehensive platform designed to help you master data structures and algorithms.
            Whether you're preparing for technical interviews, learning computer science fundamentals, or
            just want to improve your problem-solving skills, we've got you covered.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Interactive Learning:</strong> Comprehensive guides on data structures and algorithms</li>
            <li><strong>Problem Solving:</strong> Practice with our curated problem set</li>
            <li><strong>Code Editor:</strong> Write and test code in multiple languages</li>
            <li><strong>Community Forum:</strong> Discuss problems and share knowledge</li>
            <li><strong>Favorites:</strong> Save your favorite posts for quick access</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Create an account to start your journey. Practice problems, learn new concepts,
            and engage with the community. Happy coding!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

