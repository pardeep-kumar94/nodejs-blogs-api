import { DataTypes } from "sequelize";
import { dbConnection } from "../db/connection";

const Post = dbConnection.define('Post', {
  title: {
    type: DataTypes.STRING(100),
  },
  content: {
    type: DataTypes.STRING(700),
  }, 
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
})

Post.associations = (models) => {
  Post.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' })
  Post.hasMany(models.PostImages)
}

export default Post;