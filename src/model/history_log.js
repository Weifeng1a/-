const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('history_log', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "历史日志编号"
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "帮扶责任人姓名"
    },
    poverty_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "贫困户姓名"
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "帮扶内容"
    },
    demand: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "需求"
    },
    solve: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "解决情况"
    }
  }, {
    sequelize,
    tableName: 'history_log',
    timestamps: false,
    paranoid: false
  });
};