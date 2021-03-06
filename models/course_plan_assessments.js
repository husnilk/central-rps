const {
  DataTypes
} = require('sequelize');
const sequelize = require('../utils/connect')

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
      model: "course_plans_model"
    }
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "name"
  },
  percentage: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "percentage"
  },
  flag: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "flag"
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
  tableName: "course_plan_assessments",
  comment: "",
  indexes: [{
    name: "course_plan_assessments_course_plan_id_foreign",
    unique: false,
    type: "BTREE",
    fields: ["course_plan_id"]
  }]
};
const CoursePlanAssessment = sequelize.define("course_plan_assessments", attributes, options);
module.exports= CoursePlanAssessment;