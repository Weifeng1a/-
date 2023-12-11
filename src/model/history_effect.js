const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('history_effect', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "历史效益编号"
    },
    measure: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "帮扶措施"
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true,
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
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "扶贫责任人姓名"
    },
    poverty_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "贫困户姓名"
    }
  }, {
    sequelize,
    tableName: 'history_effect',
    timestamps: false,
    paranoid: false
  });
};