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
    thesis_trial_examiner_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "thesis_trial_examiner_id",
      references: {
        key: "id",
        model: "thesis_trial_examiners_model"
      }
    },
    thesis_rubric_detail_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "thesis_rubric_detail_id",
      references: {
        key: "id",
        model: "thesis_rubric_details_model"
      }
    },
    score: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "score"
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
    tableName: "thesis_trial_examiner_scores",
    comment: "",
    indexes: [{
      name: "thesis_trial_examiner_scores_thesis_trial_examiner_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["thesis_trial_examiner_id"]
    }, {
      name: "thesis_trial_examiner_scores_thesis_rubric_detail_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["thesis_rubric_detail_id"]
    }]
  };
  const ThesisTrialExaminerScoresModel = sequelize.define("thesis_trial_examiner_scores_model", attributes, options);
  return ThesisTrialExaminerScoresModel;
};