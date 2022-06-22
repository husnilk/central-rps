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
    course_syl_detail_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "course_syl_detail_id",
      references: {
        key: "id",
        model: "course_syl_details_model"
      }
    },
    course_syl_assessment_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "course_syl_assessment_id",
      references: {
        key: "id",
        model: "course_syl_assessments_model"
      }
    },
    percentage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "percentage"
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
    tableName: "course_syl_detail_assessments",
    comment: "",
    indexes: [{
      name: "course_syl_detail_assessments_course_syl_detail_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["course_syl_detail_id"]
    }, {
      name: "course_syl_detail_assessments_course_syl_assessment_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["course_syl_assessment_id"]
    }]
  };
  const CourseSylDetailAssessmentsModel = sequelize.define("course_syl_detail_assessments_model", attributes, options);
  return CourseSylDetailAssessmentsModel;
};