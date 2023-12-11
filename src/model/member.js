const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member', {
    poverty_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "贫困户户主编号",
      references: {
        model: 'poverty',
        key: 'poverty_id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "姓名"
    },
    relationship: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "与户主关系"
    },
    card_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "身份证号码"
    },
    sex: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "性别"
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "年龄"
    },
    employment: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "就业情况"
    },
    health: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "健康状况"
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "编号"
    },
  }, {
    sequelize,
    tableName: 'member',
    timestamps: false,
    indexes: [
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
