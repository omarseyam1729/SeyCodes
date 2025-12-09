import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { discussionApi } from '@/lib/api';
import type { Post } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function Discussion() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await discussionApi.getAllPosts();
        setPosts(response.posts);
        setLikedPosts(response.likedPosts || []);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleToggleFavorite = async (postId: number) => {
    if (!user) return;

    try {
      const isLiked = likedPosts.includes(postId);
      if (isLiked) {
        await discussionApi.removeFavorite(postId);
        setLikedPosts(likedPosts.filter(id => id !== postId));
      } else {
        await discussionApi.addFavorite(postId);
        setLikedPosts([...likedPosts, postId]);
      }
    } catch (err: any) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading discussions...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Discussion Forum</h1>
        {user && (
          <Link to="/discussion/new">
            <Button>New Post</Button>
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Link to={`/discussion/posts/${post.id}`}>
                    <CardTitle className="hover:underline">{post.title}</CardTitle>
                  </Link>
                  <CardDescription>
                    by {post.username} • {new Date(post.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                {user && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleFavorite(post.id)}
                    className={likedPosts.includes(post.id) ? 'text-red-600' : ''}
                  >
                    <Heart
                      className={`h-4 w-4 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`}
                    />
                    <span className="ml-2">{post.likeCount}</span>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 mb-4">{post.content}</p>
              <div className="flex justify-between items-center">
                <Link to={`/discussion/posts/${post.id}`}>
                  <Button variant="outline" size="sm">
                    View Discussion ({post.commentCount} comments)
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

