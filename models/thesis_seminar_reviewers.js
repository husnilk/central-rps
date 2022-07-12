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
    reviewer_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "reviewer_id",
      references: {
        key: "id",
        model: "lecturers_model"
      }
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "status"
    },
    position: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "position"
    },
    recomendation: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "recomendation"
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "notes"
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
    tableName: "thesis_seminar_reviewers",
    comment: "",
    indexes: [{
      name: "thesis_seminar_reviewers_thesis_seminar_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["thesis_seminar_id"]
    }, {
      name: "thesis_seminar_reviewers_reviewer_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["reviewer_id"]
    }]
  };
  const ThesisSeminarReviewersModel = sequelize.define("thesis_seminar_reviewers_model", attributes, options);
  return ThesisSeminarReviewersModel;
};