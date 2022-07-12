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
  course_plan_detail_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "course_plan_detail_id",
    references: {
      key: "id",
      model: "course_plan_details_model"
    }
  },
  course_plan_reference_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "course_plan_reference_id",
    references: {
      key: "id",
      model: "course_plan_references_model"
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "description"
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
  tableName: "course_plan_detail_refs",
  comment: "",
  indexes: [{
    name: "course_plan_detail_refs_course_plan_detail_id_foreign",
    unique: false,
    type: "BTREE",
    fields: ["course_plan_detail_id"]
  }, {
    name: "course_plan_detail_refs_course_plan_reference_id_foreign",
    unique: false,
    type: "BTREE",
    fields: ["course_plan_reference_id"]
  }]
};
const CoursePlanDetailRef = sequelize.define("course_plan_detail_refs", attributes, options);
module.exports = CoursePlanDetailRef;