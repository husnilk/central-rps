const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
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
    course_syllabus_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "course_syllabus_id",
      references: {
        key: "id",
        model: "course_syllabus_model"
      }
    },
    req_course_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "req_course_id",
      references: {
        key: "id",
        model: "courses_model"
      }
    },
    req_level: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "req_level"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_at"
    },
    updated_at: {
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
    tableName: "course_syl_requirements",
    comment: "",
    indexes: [{
      name: "course_syl_requirements_course_syllabus_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["course_syllabus_id"]
    }, {
      name: "course_syl_requirements_req_course_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["req_course_id"]
    }]
  };
  const CourseSylRequirementsModel = sequelize.define("course_syl_requirements_model", attributes, options);
  return CourseSylRequirementsModel;
};