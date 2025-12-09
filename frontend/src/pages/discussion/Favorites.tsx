import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { discussionApi } from '@/lib/api';
import type { Post } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Favorites() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await discussionApi.getFavoritePosts();
        setPosts(response.posts);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load favorite posts');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-6">Loading favorites...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Favorite Posts</h1>
      {posts.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">No favorite posts yet.</p>
            <div className="text-center mt-4">
              <Link to="/discussion">
                <Button>Browse Discussion</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <Link to={`/discussion/posts/${post.id}`}>
                  <CardTitle className="hover:underline">{post.title}</CardTitle>
                </Link>
                <CardDescription>
                  by {post.username || 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 mb-4">{post.content}</p>
                <Link to={`/discussion/posts/${post.id}`}>
                  <Button variant="outline" size="sm">
                    View Discussion
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

