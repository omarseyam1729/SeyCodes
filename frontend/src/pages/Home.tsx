import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to SeyCodes</h1>
        <p className="text-xl text-gray-600 mb-8">
          Learn data structures and algorithms, solve problems, and discuss with the community
        </p>
        {!user && (
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <Button size="lg">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline">Register</Button>
            </Link>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Learn</CardTitle>
            <CardDescription>Master data structures and algorithms</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Explore our comprehensive guides on:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Arrays</li>
              <li>Linked Lists</li>
              <li>Stacks & Queues</li>
              <li>Trees</li>
              <li>Graphs</li>
            </ul>
            <Link to="/learn/arrays">
              <Button variant="outline">Start Learning</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Practice</CardTitle>
            <CardDescription>Solve coding problems</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Challenge yourself with our curated problem set. Practice coding in JavaScript, Python, or C++.
            </p>
            {user ? (
              <Link to="/problems">
                <Button variant="outline">View Problems</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline">Login to Practice</Button>
              </Link>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Discuss</CardTitle>
            <CardDescription>Join the community</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Share your thoughts, ask questions, and learn from others in our discussion forum.
            </p>
            {user ? (
              <Link to="/discussion">
                <Button variant="outline">Go to Forum</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline">Login to Discuss</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

