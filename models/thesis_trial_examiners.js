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
    thesis_trial_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "thesis_trial_id",
      references: {
        key: "id",
        model: "thesis_trials_model"
      }
    },
    examiner_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "examiner_id",
      references: {
        key: "id",
        model: "lecturers_model"
      }
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "status"
    },
    position: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "position"
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
    tableName: "thesis_trial_examiners",
    comment: "",
    indexes: [{
      name: "thesis_trial_examiners_examiner_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["examiner_id"]
    }, {
      name: "thesis_trial_examiners_thesis_trial_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["thesis_trial_id"]
    }]
  };
  const ThesisTrialExaminersModel = sequelize.define("thesis_trial_examiners_model", attributes, options);
  return ThesisTrialExaminersModel;
};