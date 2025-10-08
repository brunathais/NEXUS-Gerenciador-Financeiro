'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Altera a coluna 'categoria' para permitir NULL
    await queryInterface.changeColumn('transacoes', 'categoria', {
      type: Sequelize.STRING,
      allowNull: true, // Permite que a categoria seja null
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Caso precise reverter a migração, altera a coluna 'categoria' de volta para não permitir NULL
    await queryInterface.changeColumn('transacoes', 'categoria', {
      type: Sequelize.STRING,
      allowNull: false, // Não permite null
    });
  }
};
