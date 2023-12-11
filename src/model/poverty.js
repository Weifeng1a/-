const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('poverty', {
    poverty_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "贫困户编号"
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "姓名"
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
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "出生日期"
    },
    card_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "身份证号"
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "家庭地址"
    },
    poverty_reason: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "致贫原因"
    },
    phone_num: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "联系电话"
    },
    labor_capacity: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "劳动能力"
    },
    poverty_level: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "贫困程度"
    },
    income: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "年收入"
    },
    bank_account: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "银行账号"
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
    is_poverty: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "是否脱贫"
    },
    is_pair: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "是否结对"
    }
  }, {
    sequelize,
    tableName: 'poverty',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "poverty_id" },
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
