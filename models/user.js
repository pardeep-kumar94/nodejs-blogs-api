import { DataTypes } from "sequelize";
import { dbConnection } from "../db/connection.js";
import bcrypt from "bcrypt";
import { uuid } from "uuidv4";



const User = dbConnection.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }, 
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  authToken: {
    type: DataTypes.UUIDV4
  }
}, {
  hooks: {
    beforeCreate: async(user) => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
      user.authToken = uuid()
    },
  },
});
export default User;

User.associations = (models) => {
  User.hasMany(models.Post)
}

(async () => {
  try {
    await dbConnection.sync(); // This will create the User table if it doesn't exist
    console.log('User model synced with database');
  } catch (error) {
    console.error('Error syncing user model:', error);
  }
})();