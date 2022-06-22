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
    thesis_seminar_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "thesis_seminar_id",
      references: {
        key: "id",
        model: "thesis_seminars_model"
      }
    },
    student_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "student_id",
      references: {
        key: "id",
        model: "students_model"
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
    tableName: "thesis_seminar_audiences",
    comment: "",
    indexes: [{
      name: "thesis_seminar_audiences_thesis_seminar_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["thesis_seminar_id"]
    }, {
      name: "thesis_seminar_audiences_student_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["student_id"]
    }]
  };
  const ThesisSeminarAudiencesModel = sequelize.define("thesis_seminar_audiences_model", attributes, options);
  return ThesisSeminarAudiencesModel;
};