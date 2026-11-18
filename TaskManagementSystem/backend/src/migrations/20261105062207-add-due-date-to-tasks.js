export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('tasks', 'due_date', {
    type : Sequelize.DATE,
    allowNull : true
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('tasks', 'due_date');
}

export default {
  up,
  down
};

