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
        model: "lecturers_model"
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
    tableName: "course_syl_lecturers",
    comment: "",
    indexes: [{
      name: "course_syl_lecturers_course_syllabus_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["course_syllabus_id"]
    }, {
      name: "course_syl_lecturers_lecturer_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["lecturer_id"]
    }]
  };
  const CourseSylLecturersModel = sequelize.define("course_syl_lecturers_model", attributes, options);
  return CourseSylLecturersModel;
};