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
    thesis_proposal_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "thesis_proposal_id",
      references: {
        key: "id",
        model: "thesis_proposals_model"
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
    tableName: "thesis_proposal_audiences",
    comment: "",
    indexes: [{
      name: "thesis_proposal_audiences_student_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["student_id"]
    }, {
      name: "thesis_proposal_audiences_thesis_proposal_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["thesis_proposal_id"]
    }]
  };
  const ThesisProposalAudiencesModel = sequelize.define("thesis_proposal_audiences_model", attributes, options);
  return ThesisProposalAudiencesModel;
};