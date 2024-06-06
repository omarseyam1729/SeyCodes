const { Sequelize } = require('sequelize');
const { Post,User,UserPost,PostComment } = require('../models');
const getAllPosts = async (req, res) => {
  try {
    const discussions = await Post.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: [
            'username',
            [Sequelize.literal("(SELECT COUNT(*) FROM UserPosts WHERE UserPosts.postId = Post.id)"), "LikeCount"]
          ],
        },
        {
          model: PostComment,
          as: 'comments',
          attributes: []
        }
      ],
      attributes: {
        include: [
          [Sequelize.literal("(SELECT COUNT(*) FROM PostComments WHERE PostComments.postId = Post.id)"), "CommentCount"]
        ]
      }
    });
    
    const formattedDiscussions = discussions.map(discussion => ({
      id: discussion.dataValues.id,
      title: discussion.dataValues.title,
      content: discussion.dataValues.content,
      authorId: discussion.dataValues.authorId,
      createdAt: discussion.dataValues.createdAt,
      updatedAt: discussion.dataValues.updatedAt,
      username:  discussion.author.username,
      likeCount: discussion.author.dataValues.LikeCount,
      commentCount:discussion.dataValues.CommentCount,
    }));
    if(!req.user)res.render('discussion/discussion', { user: req.user, discussions: formattedDiscussions,listFavorites:[]});
    else{
      const user = await User.findByPk(req.user.id, {
        include: {
          model: Post,
          through: { attributes: [] }
        }
      });
      let likedPosts=user.Posts;
      likedPosts=likedPosts.map(x=>x.id);
      res.render('discussion/discussion', { user: req.user, discussions: formattedDiscussions,listFavorites:likedPosts});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const createNewPost=async (req, res) => {
    try {
      const { title, content } = req.body;
      await Post.create({ title, content, authorId: req.user.id });
      res.redirect('/discussion');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };

const addToFavorites=async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;
    const userPost = await UserPost.create({ userId, postId });
    res.json({ message: 'Post added to favorites', userPost });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
}

const getFavoritePosts = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Post,
        through: { attributes: [] },
        include: {
          model: User,
          as: 'author',
          attributes: ['username']
        }
      }
    });

    const favoritePosts = user.Posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author ? post.author.username : null
    }));
    res.render('discussion/favorites', { user: req.user, discussions: favoritePosts});
  } catch (error) {
    console.error('Error fetching favorite posts:', error);
    res.status(500).json({ error: 'Failed to fetch favorite posts' });
  }
};

const removeFavorites = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  try {
    const favorite = await UserPost.findOne({ where: { userId, postId } });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    await favorite.destroy();
    return res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
}

const getComments = async (req, res) => {
  try {
    const { postId } = req.params; // Extract postId from request parameters
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, as: 'author', attributes: ['username'] }, // Include author details
        {
          model: PostComment,
          as:'comments',
          include: [{ model: User, as: 'user', attributes: ['username'] }], // Include user details in comments
        },
      ],
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if post.PostComments is defined and an array
    if (!Array.isArray(post.comments)) {
      return res.status(500).json({ message: 'Error retrieving comments' });
    }

    return res.render('discussion/comments', { discussion: post, comments: post.comments, user: req.user });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ message: 'An error occurred while fetching the post and comments', error });
  }
};

const removePost=async (req,res)=>{
  const userId = req.user.id;
  const id = req.params.postId;
  const post = await Post.findOne({ where: { id } });
  await post.destroy();
  res.status(200).redirect('/discussion');
}

const addComment = async (req, res) => {
  try {
    const { postId } = req.params; 
    const { content } = req.body;
    const userId = req.user.id; 
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Comment content cannot be empty' });
    }

     await PostComment.create({
      postId,
      userId,
      content,

    });
    res.redirect(`/discussion/comments/${postId}`);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while adding the comment', error });
  }
};
const removeComment=async(req,res)=>{
  const id = req.params.commentId;
  const refererUrl = req.get('Referer') || '/discussion';
  const comment = await PostComment.findOne({ where: { id } });
  await comment.destroy();
  res.status(200).redirect(refererUrl);
}
module.exports={getAllPosts,createNewPost,addToFavorites,getFavoritePosts,removeFavorites,removePost,getComments,addComment,removeComment};