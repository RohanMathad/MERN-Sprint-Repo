'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id :{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
      },
      name : {
        type : Sequelize.STRING,
        allowNull : false
      },
      billing_budget : {
        type : Sequelize.DECIMAL(10,2),
        allowNull : false,
        defaultValue : 0.00
      },
      created_at : {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
      }, 
      updated_at : {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }

    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  }
};
