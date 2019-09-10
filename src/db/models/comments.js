import eventEmitter from '../../helpers/eventEmitter';

export default (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    'Comments',
    {
      body: DataTypes.TEXT,
      slug: DataTypes.STRING,
      user: DataTypes.INTEGER
    },
    {
      hooks: {
        afterCreate: async (comment) => {
          const { user, slug } = comment.dataValues;
          eventEmitter.emit('newComment', user, slug);
        }
      }
    }
  );
  Comments.associate = function (models) {
    Comments.hasMany(models.LikeDislikeComment, {
      as: 'comment',
      foreignKey: 'commentId'
    });
    Comments.belongsTo(models.Users, {
      foreignKey: 'user',
      onDelete: 'CASCADE'
    });
  };
  return Comments;
};
