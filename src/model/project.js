const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project', {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "扶贫项目编号"
    },
    applicant_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "申请人编号",
    },
    village_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "贫困村编号",
      references: {
        model: 'village',
        key: 'village_id'
      }
    },
    project_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "项目名称"
    },
    project_target: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "项目目标"
    },
    project_content: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "项目内容"
    },
    project_budget: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "项目预算"
    },
    statu: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "项目状态（0未审核、1审核不通过、2未分配、3已分配、4已完成）"
    }
  }, {
    sequelize,
    tableName: 'project',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "village_id",
        using: "BTREE",
        fields: [
          { name: "village_id" },
        ]
      },
    ]
  });
};
