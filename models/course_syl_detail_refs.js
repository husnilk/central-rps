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
    course_syl_reference_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "course_syl_reference_id",
      references: {
        key: "id",
        model: "course_syl_references_model"
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
    tableName: "course_syl_detail_refs",
    comment: "",
    indexes: [{
      name: "course_syl_detail_refs_course_syl_detail_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["course_syl_detail_id"]
    }, {
      name: "course_syl_detail_refs_course_syl_reference_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["course_syl_reference_id"]
    }]
  };
  const CourseSylDetailRefsModel = sequelize.define("course_syl_detail_refs_model", attributes, options);
  return CourseSylDetailRefsModel;
};