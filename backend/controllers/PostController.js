const prisma = require('../lib/prisma');

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { id: true, username: true }
        },
        _count: {
          select: { 
            comments: true,
            favoritedBy: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      username: post.author.username,
      likeCount: post._count.favoritedBy,
      commentCount: post._count.comments,
    }));

    let likedPosts = [];
    if (req.user) {
      const userFavorites = await prisma.userPost.findMany({
        where: { userId: req.user.id },
        select: { postId: true }
      });
      likedPosts = userFavorites.map(f => f.postId);
    }

    res.json({ 
      posts: formattedPosts,
      likedPosts 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const createNewPost = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const post = await prisma.post.create({
      data: { title, content, authorId: req.user.id }
    });
    
    res.status(201).json({ 
      message: 'Post created successfully',
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        createdAt: post.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const addToFavorites = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const postId = parseInt(req.params.postId);
    const userId = req.user.id;
    
    // Check if already favorited
    const existing = await prisma.userPost.findUnique({
      where: { userId_postId: { userId, postId } }
    });
    
    if (existing) {
      return res.status(400).json({ error: 'Post already in favorites' });
    }

    const userPost = await prisma.userPost.create({
      data: { userId, postId }
    });
    
    res.json({ message: 'Post added to favorites', userPost });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

const getFavoritePosts = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const favorites = await prisma.userPost.findMany({
      where: { userId: req.user.id },
      include: {
        post: {
          include: {
            author: { select: { id: true, username: true } }
          }
        }
      }
    });

    const favoritePosts = favorites.map(fav => ({
      id: fav.post.id,
      title: fav.post.title,
      content: fav.post.content,
      authorId: fav.post.authorId,
      createdAt: fav.post.createdAt,
      updatedAt: fav.post.updatedAt,
      username: fav.post.author?.username || null
    }));
    
    res.json({ posts: favoritePosts });
  } catch (error) {
    console.error('Error fetching favorite posts:', error);
    res.status(500).json({ error: 'Failed to fetch favorite posts' });
  }
};

const removeFavorites = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const userId = req.user.id;
  const postId = parseInt(req.params.postId);
  
  try {
    const favorite = await prisma.userPost.findUnique({
      where: { userId_postId: { userId, postId } }
    });
    
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    
    await prisma.userPost.delete({
      where: { userId_postId: { userId, postId } }
    });
    
    return res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: { select: { id: true, username: true } },
        comments: {
          include: {
            user: { select: { id: true, username: true } }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const formattedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      author: post.author ? { id: post.author.id, username: post.author.username } : null,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      comments: post.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        userId: comment.userId,
        username: comment.user?.username || null,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      }))
    };

    return res.json({ post: formattedPost });
  } catch (error) {
    console.error('Error fetching post:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the post' });
  }
};

const getComments = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    
    const comments = await prisma.postComment.findMany({
      where: { postId },
      include: {
        user: { select: { id: true, username: true } }
      },
      orderBy: { createdAt: 'asc' }
    });

    const formattedComments = comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      userId: comment.userId,
      username: comment.user?.username || null,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt
    }));

    return res.json({ comments: formattedComments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ error: 'An error occurred while fetching comments' });
  }
};

const removePost = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const id = parseInt(req.params.postId);
    const post = await prisma.post.findUnique({ where: { id } });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user is the author
    if (post.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    await prisma.post.delete({ where: { id } });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const addComment = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const postId = parseInt(req.params.postId);
    const { content } = req.body;
    const userId = req.user.id;
    
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Comment content cannot be empty' });
    }

    const comment = await prisma.postComment.create({
      data: { postId, userId, content },
      include: {
        user: { select: { id: true, username: true } }
      }
    });

    res.status(201).json({
      message: 'Comment added successfully',
      comment: {
        id: comment.id,
        content: comment.content,
        userId: comment.userId,
        username: comment.user?.username || null,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      }
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'An error occurred while adding the comment' });
  }
};

const removeComment = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const id = parseInt(req.params.commentId);
    const comment = await prisma.postComment.findUnique({ where: { id } });
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if user is the author
    if (comment.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }

    await prisma.postComment.delete({ where: { id } });
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getAllPosts,
  createNewPost,
  addToFavorites,
  getFavoritePosts,
  removeFavorites,
  removePost,
  getPost,
  getComments,
  addComment,
  removeComment
};
