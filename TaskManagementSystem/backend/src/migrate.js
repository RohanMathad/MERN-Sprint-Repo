// import { Umzug, SequelizeStorage } from 'umzug';
// import { Sequelize } from 'sequelize';
// import sequelize from './config/db.js'; // Ensure this points to your DB connection file


// const umzug = new Umzug({
//   // Point to where your migration files live
//   migrations: {
//     glob: 'migrations/*.js', 
//     resolve: ({ name, path, context }) => {
//       // This custom resolver allows us to use your preferred format: up(queryInterface, Sequelize)
//       return {
//         name,
//         up: async () => {
//           const migration = await import(path);
//           return migration.up(context, Sequelize);
//         },
//         down: async () => {
//           const migration = await import(path);
//           return migration.down(context, Sequelize);
//         },
//       };
//     },
//   },
//   context: sequelize.getQueryInterface(),
//   storage: new SequelizeStorage({ sequelize }),
//   logger: console,
// });

// // Immediately invoked function to run the migrations
// (async () => {
//   try {
    
//     // =========================================================================
//     // CHOOSE ONE OF THE OPTIONS BELOW AND COMMENT OUT THE OTHERS
//     // =========================================================================

//     // OPTION 1: Run ALL pending migrations (Standard local dev behavior)
//     await umzug.up(); 

//     // OPTION 2: Run a SPECIFIC migration UP (Mentor's best practice)
//     // await umzug.up({ migrations: ['20261118123456-add-phone-to-users.js', 'name of file2'] });

//     // OPTION 3: Revert a SPECIFIC migration DOWN (If you made a mistake)
//     // await umzug.down({ migrations: ['20261118123456-add-phone-to-users.js'] });

//     console.log('-------------------------------------migrations executed successfully!-------------------------------------');
//     process.exit(0);
//   } catch (error) {
//     console.error('-------------------------------------Migration failed!-------------------------------------', error);
//     process.exit(1);
//   }
// })();


import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
import sequelize from './config/db.js'; 
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsPath = path.join(__dirname, '../migrations/*.js');

const umzug = new Umzug({
  migrations: {
    glob: migrationsPath, 
    resolve: ({ name, path: migrationPath, context }) => {
      return {
        name,
        up: async () => {
          const migration = await import(migrationPath);
          return migration.up(context, Sequelize);
        },
        down: async () => {
          const migration = await import(migrationPath);
          return migration.down(context, Sequelize);
        },
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  try {
    const pending = await umzug.pending();
    if (pending.length === 0) {
      console.log('No pending migrations found!');
      process.exit(0);
    }

    await umzug.up();


    console.log('-------------------------------------');
    console.log('Migrations executed successfully!');
    console.log('-------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
})();