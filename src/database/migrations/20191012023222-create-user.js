'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: 'Please enter your name.'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: 'Please enter your password.'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          msg: 'E-mail already registered.'
        },
        validate: {
          notEmpty: true,
          notNull: {
            msg: 'Please enter your email.'
          },
          isEmail: {
            msg: 'Enter a valid email.'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users')
  }
}
