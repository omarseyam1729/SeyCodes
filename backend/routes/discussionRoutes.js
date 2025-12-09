const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PostController = require('../controllers/PostController');

// Posts routes
router.get('/posts', auth.authenticate, auth.requireAuth, PostController.getAllPosts);
router.get('/posts/favorites', auth.authenticate, auth.requireAuth, PostController.getFavoritePosts);
router.get('/posts/:postId', auth.authenticate, auth.requireAuth, PostController.getPost);
router.post('/posts', auth.authenticate, auth.requireAuth, PostController.createNewPost);
router.delete('/posts/:postId', auth.authenticate, auth.requireAuth, PostController.removePost);

// Favorites routes
router.post('/posts/:postId/favorite', auth.authenticate, auth.requireAuth, PostController.addToFavorites);
router.delete('/posts/:postId/favorite', auth.authenticate, auth.requireAuth, PostController.removeFavorites);

// Comments routes
router.get('/posts/:postId/comments', auth.authenticate, auth.requireAuth, PostController.getComments);
router.post('/posts/:postId/comments', auth.authenticate, auth.requireAuth, PostController.addComment);
router.delete('/comments/:commentId', auth.authenticate, auth.requireAuth, PostController.removeComment);

module.exports = router;