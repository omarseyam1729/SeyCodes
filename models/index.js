const User = require('./User');
const Comment = require('./Comment');
const UserProblem = require('./UserProblem');
const PostComment = require('./PostComment');
const UserPost = require('./UserPost');
const Problem = require('./Problem');
const Post = require('./Post');
const sequelize = require('../config/connection');

// User associations
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
});

User.belongsToMany(Problem, {
  through: UserProblem,
  foreignKey: 'userId',
});

Problem.belongsToMany(User, {
  through: UserProblem,
  foreignKey: 'problemId',
});

User.belongsToMany(Post, {
  through: UserPost,
  foreignKey: 'userId',
});

Post.belongsToMany(User, {
  through: UserPost,
  foreignKey: 'postId',
});

User.hasMany(Post, { 
  as: 'posts', 
  foreignKey: 'authorId' 
});

Post.belongsTo(User, { 
  as: 'author', 
  foreignKey: 'authorId' 
});

User.hasMany(PostComment, {
  foreignKey: 'userId',
});

PostComment.belongsTo(User, {
  foreignKey: 'userId',
});

// Problem associations
Problem.hasMany(Comment, {
  foreignKey: 'problemId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Problem, {
  foreignKey: 'problemId',
});

// Post associations
Post.hasMany(PostComment, {
  as:'comments',
  foreignKey: 'postId',
});

PostComment.belongsTo(Post, {
  foreignKey: 'postId',
});

// Initialize models
const models = {
  User,
  Comment,
  UserProblem,
  Problem,
  Post,
  PostComment,
  UserPost,
  sequelize,
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

sequelize.sync({ force: false }).then(() => {
  console.log('Connected to the db');
});

module.exports = models;
