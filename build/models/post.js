'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    categories: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    authorName: { type: DataTypes.STRING },
    authorUsername: { type: DataTypes.STRING },
    authorId: { type: DataTypes.STRING }
  }, {
    timestamps: true,
    tableName: 'posts'
  });

  return post;
};