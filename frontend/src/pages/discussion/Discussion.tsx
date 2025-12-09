import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { discussionApi } from '@/lib/api';
import type { Post } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Plus, Clock, User } from 'lucide-react';

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
        setPosts(posts.map(p => p.id === postId ? { ...p, likeCount: p.likeCount - 1 } : p));
      } else {
        await discussionApi.addFavorite(postId);
        setLikedPosts([...likedPosts, postId]);
        setPosts(posts.map(p => p.id === postId ? { ...p, likeCount: p.likeCount + 1 } : p));
      }
    } catch (err: any) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass border-white/10 animate-pulse">
              <CardHeader>
                <div className="h-6 bg-secondary rounded w-3/4 mb-2" />
                <div className="h-4 bg-secondary rounded w-1/4" />
              </CardHeader>
              <CardContent>
                <div className="h-16 bg-secondary rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="glass border-destructive/30 max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="text-destructive mb-4">{error}</div>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 animate-fade-in">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-pink-500/30 text-pink-400 text-sm font-medium mb-4">
              <MessageSquare className="w-4 h-4" />
              <span>Community Hub</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Discussion <span className="gradient-text-purple">Forum</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Share ideas, ask questions, and learn from the community.
            </p>
          </div>
          {user && (
            <Link to="/discussion/new">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold">
                <Plus className="w-5 h-5 mr-2" />
                New Post
              </Button>
            </Link>
          )}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post, i) => (
            <Card 
              key={post.id} 
              className="glass border-white/10 group hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <Link to={`/discussion/posts/${post.id}`}>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors truncate">
                        {post.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.username}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  {user && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleFavorite(post.id)}
                      className={`shrink-0 ${likedPosts.includes(post.id) ? 'text-rose-500 hover:text-rose-400' : 'text-muted-foreground hover:text-rose-500'}`}
                    >
                      <Heart
                        className={`w-5 h-5 transition-all ${likedPosts.includes(post.id) ? 'fill-current scale-110' : ''}`}
                      />
                      <span className="ml-2">{post.likeCount}</span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2 mb-4">{post.content}</p>
                <div className="flex items-center justify-between">
                  <Link to={`/discussion/posts/${post.id}`}>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {post.commentCount} comments
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <Card className="glass border-white/10 max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No discussions yet. Be the first to start one!</p>
              {user && (
                <Link to="/discussion/new">
                  <Button className="bg-gradient-to-r from-pink-500 to-rose-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
