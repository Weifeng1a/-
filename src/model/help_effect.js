const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('help_effect', {
    pair_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "结对编号",
      references: {
        model: 'pair',
        key: 'pairing_id'
      }
    },
    measure: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "帮扶措施"
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "开始时间"
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "结束时间"
    },
    effect: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "成效"
    },
    help_effect_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "成效编号"
    }
  }, {
    sequelize,
    tableName: 'help_effect',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pair_id" },
        ]
      },
    ]
  });
};
