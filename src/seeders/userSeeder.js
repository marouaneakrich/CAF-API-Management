const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // FIX: Await the asynchronous bcrypt.hash function
    // For production, you should also specify a salt factor (e.g., 10 or 12)
    const hashedPassword = await bcrypt.hash("azerty", 10); 

    await queryInterface.bulkInsert('users', [{
      username: 'John admin',
      email: 'john.doe@example.com',
      password: hashedPassword, // The awaited hashed string is used here
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // It's generally safer to delete based on a known field if possible, 
    // but bulkDelete with null is valid if you want to clear the entire table.
    await queryInterface.bulkDelete('Users', null, {});
  }
};