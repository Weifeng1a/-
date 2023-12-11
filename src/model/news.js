const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('news', {
    news_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "新闻编号"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "新闻标题"
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "新闻图片"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "新闻内容"
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "新闻来源"
    },
    publication_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "发表时间"
    }
  }, {
    sequelize,
    tableName: 'news',
    timestamps: false,
    paranoid: false
  });
};