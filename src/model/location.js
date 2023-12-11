const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('location', {
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "市名"
    },
    abscissa: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      comment: "市横坐标"
    },
    ordinate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      comment: "市纵坐标"
    },
    village_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "贫困村数"
    }
  }, {
    sequelize,
    tableName: 'location',
    timestamps: false
  });
};
