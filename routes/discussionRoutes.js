const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PostController = require('../controllers/PostController');

router.get('/discussion',auth.authenticate,PostController.getAllPosts );
router.get('/discussion/new',auth.authenticate, (req, res) => {
    res.render('discussion/newPost',{user:req.user});
  });
router.get('/discussion/favoriteposts',auth.authenticate,PostController.getFavoritePosts);
router.get('/discussion/comments/:postId',auth.authenticate,PostController.getComments);
router.post('/addFavorites/:postId',auth.authenticate,PostController.addToFavorites);
router.post('/discussion/comments/:postId',auth.authenticate,PostController.addComment);
router.post('/discussion/new',auth.authenticate,PostController.createNewPost);
router.delete('/removeFavorites/:postId',auth.authenticate,PostController.removeFavorites);
router.delete('/discussion/delete/:postId',auth.authenticate,PostController.removePost);
router.delete('/discussion/comment/delete/:commentId',auth.authenticate,PostController.removeComment);
module.exports=router;