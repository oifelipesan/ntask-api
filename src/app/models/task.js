'use strict'

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      title: DataTypes.STRING,
      done: DataTypes.BOOLEAN
    },
    {
      timestamps: true,
      sequelize,
      modelName: 'task'
    }
  )
  Task.associate = function(models) {
    Task.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' })
  }
  return Task
}
