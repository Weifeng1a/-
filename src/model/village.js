const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('village', {
    village_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "贫困村编号"
    },
    village_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "村落名称"
    },
    household_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "贫困户口数"
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "人数"
    },
    poverty_reason: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "致贫原因"
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "添加时间"
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "更新时间"
    },
    is_delete: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "是否删除（1代表删除）"
    }
  }, {
    sequelize,
    tableName: 'village',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "village_id" },
        ]
      },
    ]
  });
};
