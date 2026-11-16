/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('projects', [{
    name : 'Zeliot Condense IoT',
    billing_budget: 50000.00,
    created_at: new Date(),
    updated_at: new Date()
  }]);

  const [projects] = await queryInterface.sequelize.query(
    `SELECT id FROM projects WHERE name = 'Zeliot Condense IoT';`
  );

  const projectId = projects[0].id;

  await queryInterface.bulkInsert('tasks', [
    {
      title : 'Setup WebSockets',
      description : 'Implement real-time data streaming for the dashboard',
      status : 'pending',
      project_id : projectId,
      created_at : new Date(),
      updated_at : new Date()
    },
    {
      title : 'Design Dashboard UI',
      description : 'Build React components with SCSS',
      status : 'in_progress',
      project_id: projectId,
      created_at : new Date(),
      updated_at : new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('tasks', null, {});
  await queryInterface.bulkDelete('projects', null, {});
}

export default {
  up,
  down
};

