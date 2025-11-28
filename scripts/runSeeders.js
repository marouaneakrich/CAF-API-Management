// scripts/runSeeders.js
const sequelize  = require('../src/config/database'); // Assuming your sequelize instance is exported from models/index.js
const userSeeder = require('../src/seeders/userSeeder');

async function runSeeders() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Execute the 'up' method of each seeder
    await userSeeder.up(sequelize.getQueryInterface(), sequelize.Sequelize);
    console.log('User seeder executed successfully.');

    // You can add more seeders here
    // await anotherSeeder.up(sequelize.getQueryInterface(), sequelize.Sequelize);

    console.log('All seeders executed.');
  } catch (error) {
    console.error('Error running seeders:', error);
  } finally {
    await sequelize.close();
  }
}

runSeeders();