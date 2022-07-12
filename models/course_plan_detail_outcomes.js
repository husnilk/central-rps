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
    course_lo_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "course_lo_id",
      references: {
        key: "id",
        model: "course_los_model"
      }
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
    tableName: "course_plan_detail_outcomes",
    comment: "",
    indexes: [{
      name: "course_plan_detail_outcomes_course_plan_detail_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["course_plan_detail_id"]
    }, {
      name: "course_plan_detail_outcomes_course_lo_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["course_lo_id"]
    }]
  };
  const CoursePlanDetailOutcomesModel = sequelize.define("course_plan_detail_outcomes_model", attributes, options);
  return CoursePlanDetailOutcomesModel;
};