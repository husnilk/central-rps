const { DataTypes } = require('sequelize');
var sequelize = require('../utils/connect');

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
  course_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "course_id",
    references: {
      key: "id",
      model: "courses"
    }
  },
  rev: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "rev"
  },
  code: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "code"
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "name"
  },
  alias_name: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "alias_name"
  },
  credit: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "credit"
  },
  semester: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "semester"
  },
  mandatory: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "mandatory"
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "description"
  },
  material: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "material"
  },
  created_by: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "created_by",
    references: {
      key: "id",
      model: "users"
    }
  },
  validated_by: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "validated_by",
    references: {
      key: "id",
      model: "users"
    }
  },
  validated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "validated_at"
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
  tableName: "course_plans",
  comment: "",
  indexes: [{
    name: "course_plans_course_id_foreign",
    unique: false,
    type: "BTREE",
    fields: ["course_id"]
  }, {
    name: "course_plans_created_by_foreign",
    unique: false,
    type: "BTREE",
    fields: ["created_by"]
  }, {
    name: "course_plans_validated_by_foreign",
    unique: false,
    type: "BTREE",
    fields: ["validated_by"]
  }]
};
const CoursePlan = sequelize.define("course_plans", attributes, options);
module.exports = CoursePlan;