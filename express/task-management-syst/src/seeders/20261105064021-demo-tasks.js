'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {
        title: 'Master Sequelize Migrations',
        description: 'Learn how to alter tables without dropping them.',
        status: 'completed',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Learn Docker Containers',
        description: 'Prepare for Zeliot microservices architecture.',
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Explore Go (Golang)',
        description: 'Research high-performance backend alternatives.',
        status: 'in_progress',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    // The undo button: wipes all data from the tasks table
    await queryInterface.bulkDelete('tasks', null, {});
  }
};