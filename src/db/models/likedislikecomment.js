'use strict';
export default (sequelize, DataTypes) => {
  const LikeDislikeComment = sequelize.define('LikeDislikeComment', {
    userId: {
        type: DataTypes.INTEGER
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    like: DataTypes.BOOLEAN,
    dislike: DataTypes.BOOLEAN
  }, {});
  LikeDislikeComment.associate = function(models) {
    // associations can be defined here
    LikeDislikeComment.belongsTo(models.Comments, {
        as: 'comment',
        foreignKey: 'commentId',
        onDelete: 'CASCADE'
    });
  };
  return LikeDislikeComment;
};
