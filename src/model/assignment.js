const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('assignment', {
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "项目分配编号"
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "项目编号",
      references: {
        model: 'project',
        key: 'project_id'
      }
    },
    leader_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "项目负责人编号",
      references: {
        model: 'role',
        key: 'user_id'
      }
    },
    'start _time': {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "项目启动时间"
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "项目结束时间"
    }
  }, {
    sequelize,
    tableName: 'assignment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "assignment_id" },
        ]
      },
      {
        name: "project_id",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "leader_id",
        using: "BTREE",
        fields: [
          { name: "leader_id" },
        ]
      },
    ]
  });
};
