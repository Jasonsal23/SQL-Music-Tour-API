'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bands', [{
      name: 'Loaded Diaper',
      genre: 'Hard rock',
      founded: 2005,
      available_start_time: '18:00:00',
      end_time: '22:00:00'
    },
  {
    name: 'Transformers',
    genre: 'Radio waves',
    founded: 3000,
    available_start_time: '18:00:00',
    end_time: '22:00:00'
  }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bands', null, {})
  }
};
