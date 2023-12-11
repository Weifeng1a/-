const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pair', {
    pairing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "结对编号"
    },
    responsible_person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "帮扶责任人编号",
      references: {
        model: 'role',
        key: 'user_id'
      }
    },
    poverty_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "贫困户编号",
      references: {
        model: 'poverty',
        key: 'poverty_id'
      }
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "开始时间"
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "结束时间"
    }
  }, {
    sequelize,
    tableName: 'pair',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pairing_id" },
        ]
      },
      {
        name: "responsible_person_id",
        using: "BTREE",
        fields: [
          { name: "responsible_person_id" },
        ]
      },
      {
        name: "poverty_id",
        using: "BTREE",
        fields: [
          { name: "poverty_id" },
        ]
      },
    ]
  });
};
