const {
  DataTypes
} = require('sequelize');
var sequelize = require('../utils/connect');
const CoursePlan = require('./course_plans');

const attributes = {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: true,
    comment: null,
    field: "id"
  },
  course_plan_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "course_plan_id",
    references: {
      key: "id",
      model: "course_plans"
    }
  },
  lecturer_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "lecturer_id",
    references: {
      key: "id",
      model: "lecturers"
    }
  },
  creator: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "creator"
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "created_at"
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "updated_at"
  }
};
const options = {
  tableName: "course_plan_lecturers",
  comment: "",
  indexes: [{
    name: "course_plan_lecturers_course_plan_id_foreign",
    unique: false,
    type: "BTREE",
    fields: ["course_plan_id"]
  }, {
    name: "course_plan_lecturers_lecturer_id_foreign",
    unique: false,
    type: "BTREE",
    fields: ["lecturer_id"]
  }]
};
const CoursePlanLecturer = sequelize.define("course_plan_lecturers", attributes, options);

CoursePlanLecturer.hasMany(CoursePlan);

module.exports = CoursePlanLecturer;