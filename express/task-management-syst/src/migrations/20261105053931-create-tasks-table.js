'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
      },
      title :  {
        type : Sequelize.STRING,
        allowNull: false
      },
      description : {
        type : Sequelize.TEXT,
        allowNull : true
      },
      status : {
        type : Sequelize.ENUM('pending', 'in_progress', 'completed'),
        defaultValue :  'pending',
        allowNull : false
      },
      created_at  :{
        type : Sequelize.DATE,
        allowNull :  false,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at : {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
    });
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }

};

