/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('tasks', 'project_id', {
    type : Sequelize.INTEGER,
    allowNull :true,
    references : {
      model : 'projects',//parent table
      key : 'id'//column we are linking to of parent table
    },
    onUpdate : 'CASCADE',
    onDelete : 'SET NULL'//if proj is deleted then dont delete the task,just set it null
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('tasks', 'project_id');
}

export default {
  up,
  down
};

