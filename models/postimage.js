import { dbConnection } from "../db/connection";

const PostImages = dbConnection.define('PostImage', {
  imageUrl: {
    type: Sequelize.STRING
  },
  postId: {
    type: Sequelize.INTEGER,
  },
})

PostImages.associations = (model) => {
  PostImages.belongsTo(model.Post, { foreignKey: 'postId', onDelete:'CASCADE' })
}

export default PostImages;