const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "用户编号"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "姓名"
    },
    account: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "账号"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "密码"
    },
    tel: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "电话号码"
    },
    card: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "身份证"
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "头像"
    },
    is_delete: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "是否删除（1代表删除）"
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
