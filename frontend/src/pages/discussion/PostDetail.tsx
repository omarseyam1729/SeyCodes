import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { discussionApi } from '@/lib/api';
import type { PostDetail as PostDetailType, Comment } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<PostDetailType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'post' | 'comment'; id: number } | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      try {
        const response = await discussionApi.getPost(parseInt(postId));
        setPost(response.post);
        setComments(response.post.comments || []);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId || !commentContent.trim()) return;

    setSubmitting(true);
    try {
      const response = await discussionApi.addComment(parseInt(postId), commentContent);
      setComments([...comments, response.comment]);
      setCommentContent('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      if (itemToDelete.type === 'post') {
        await discussionApi.deletePost(itemToDelete.id);
        navigate('/discussion');
      } else {
        await discussionApi.deleteComment(itemToDelete.id);
        setComments(comments.filter(c => c.id !== itemToDelete.id));
      }
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete');
    }
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading post...</div>;
  }

  if (error || !post) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-red-600 mb-4">{error || 'Post not found'}</div>
        <Button onClick={() => navigate('/discussion')}>Back to Discussion</Button>
      </div>
    );
  }

  const isAuthor = user && (user.id === post.authorId);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate('/discussion')}>
          ← Back to Discussion
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <CardDescription>
                by {post.author?.username || 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
            {isAuthor && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setItemToDelete({ type: 'post', id: post.id });
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none mb-4">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {user && (
            <form onSubmit={handleAddComment} className="mb-6">
              <div className="space-y-2">
                <Label htmlFor="comment">Add a comment</Label>
                <Textarea
                  id="comment"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Write your comment..."
                  disabled={submitting}
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" className="mt-2" disabled={submitting}>
                {submitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </form>
          )}

          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{comment.username || 'Unknown'}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap">{comment.content}</p>
                    </div>
                    {user && user.id === comment.userId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setItemToDelete({ type: 'comment', id: comment.id });
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {itemToDelete?.type}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

