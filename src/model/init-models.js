var DataTypes = require("sequelize").DataTypes;
var _assignment = require("./assignment");
var _evaluation = require("./evaluation");
var _help_effect = require("./help_effect");
var _help_log = require("./help_log");
var _location = require("./location");
var _member = require("./member");
var _news = require("./news");
var _pair = require("./pair");
var _poverty = require("./poverty");
var _project = require("./project");
var _role = require("./role");
var _user = require("./user");
var _village = require("./village");
var _history_log = require('./history_log')
var _history_effect = require('./history_effect')
const sequelize = require('../utils/ORM')
function initModels() {
  var assignment = _assignment(sequelize, DataTypes);
  var evaluation = _evaluation(sequelize, DataTypes);
  var help_effect = _help_effect(sequelize, DataTypes);
  var help_log = _help_log(sequelize, DataTypes);
  var location = _location(sequelize, DataTypes);
  var member = _member(sequelize, DataTypes);
  var news = _news(sequelize, DataTypes);
  var pair = _pair(sequelize, DataTypes);
  var poverty = _poverty(sequelize, DataTypes);
  var project = _project(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var village = _village(sequelize, DataTypes);
  var history_log = _history_log(sequelize,DataTypes)
  var history_effect = _history_effect(sequelize,DataTypes)
  evaluation.belongsTo(assignment, { as: "assignment", foreignKey: "assignment_id"});
  assignment.hasOne(evaluation, { as: "evaluation", foreignKey: "assignment_id"});
  help_effect.belongsTo(pair, { as: "pair", foreignKey: "pair_id"});
  pair.hasOne(help_effect, { as: "help_effect", foreignKey: "pair_id"});
  help_log.belongsTo(pair, { as: "pair", foreignKey: "pair_id"});
  pair.hasOne(help_log, { as: "help_log", foreignKey: "pair_id"});
  member.belongsTo(poverty, { as: "poverty", foreignKey: "poverty_id"});
  poverty.hasMany(member, { as: "members", foreignKey: "poverty_id"});
  pair.belongsTo(poverty, { as: "poverty", foreignKey: "poverty_id"});
  poverty.hasMany(pair, { as: "pairs", foreignKey: "poverty_id"});
  assignment.belongsTo(project, { as: "project", foreignKey: "project_id"});
  project.hasMany(assignment, { as: "assignments", foreignKey: "project_id"});
  assignment.belongsTo(role, { as: "leader", foreignKey: "leader_id"});
  role.hasMany(assignment, { as: "assignments", foreignKey: "leader_id"});
  pair.belongsTo(role, { as: "responsible_person", foreignKey: "responsible_person_id"});
  role.hasMany(pair, { as: "pairs", foreignKey: "responsible_person_id"});
  role.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasOne(role, { as: "role", foreignKey: "user_id"});
  poverty.belongsTo(village, { as: "village", foreignKey: "village_id"});
  village.hasMany(poverty, { as: "povertys", foreignKey: "village_id"});
  project.belongsTo(village, { as: "village", foreignKey: "village_id"});
  village.hasMany(project, { as: "projects", foreignKey: "village_id"});

  return {
    assignment,
    evaluation,
    help_effect,
    help_log,
    location,
    member,
    news,
    pair,
    poverty,
    project,
    role,
    user,
    village,
    history_log,
    history_effect
  };
}
module.exports = {initModels};
