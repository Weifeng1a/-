const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('evaluation', {
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "项目分配编号",
      references: {
        model: 'assignment',
        key: 'assignment_id'
      }
    },
    project_effect: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "项目成效"
    },
    assessment: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "项目评估"
    }
  }, {
    sequelize,
    tableName: 'evaluation',
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
    ]
  });
};
