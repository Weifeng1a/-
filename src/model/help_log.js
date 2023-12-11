const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('help_log', {
    pair_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "结对编号",
      references: {
        model: 'pair',
        key: 'pairing_id'
      }
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "帮扶内容"
    },
    demand: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "帮扶需求"
    },
    solve: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "需求解决情况"
    },
    help_log_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "日志编号"
    }
  }, {
    sequelize,
    tableName: 'help_log',
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
