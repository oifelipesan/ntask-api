const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync()
          user.password = bcrypt.hashSync(user.password, salt)
        },
        beforeUpdate: user => {
          const salt = bcrypt.genSaltSync()
          user.password = bcrypt.hashSync(user.password, salt)
        }
      }
    },
    {
      timestamps: true,
      sequelize,
      modelName: 'user'
    }
  )
  User.associate = models => {
    User.hasMany(models.Task, { foreignKey: 'UserId', as: 'tasks' })
  }
  User.isPassword = (encodePassword, password) => {
    return bcrypt.compareSync(password, encodePassword)
  }
  return User
}
