export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('tasks', 'icon', {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'CheckCircle'
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('tasks', 'icon');
}