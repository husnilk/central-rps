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
    curriculum_lo_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "curriculum_lo_id",
      references: {
        key: "id",
        model: "curriculum_los_model"
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
    tableName: "course_lo_details",
    comment: "",
    indexes: [{
      name: "course_lo_details_curriculum_lo_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["curriculum_lo_id"]
    }, {
      name: "course_lo_details_course_lo_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["course_lo_id"]
    }]
  };
  const CourseLoDetailsModel = sequelize.define("course_lo_details_model", attributes, options);
  return CourseLoDetailsModel;
};