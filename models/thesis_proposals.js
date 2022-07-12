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
    thesis_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "thesis_id",
      references: {
        key: "id",
        model: "theses_model"
      }
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "datetime"
    },
    room_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "room_id",
      references: {
        key: "id",
        model: "rooms_model"
      }
    },
    grade: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "grade"
    },
    graded_by: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "graded_by",
      references: {
        key: "id",
        model: "users_model"
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
    file_proposal: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "file_proposal"
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
    tableName: "thesis_proposals",
    comment: "",
    indexes: [{
      name: "thesis_proposals_thesis_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["thesis_id"]
    }, {
      name: "thesis_proposals_room_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["room_id"]
    }, {
      name: "thesis_proposals_graded_by_foreign",
      unique: false,
      type: "BTREE",
      fields: ["graded_by"]
    }]
  };
  const ThesisProposalsModel = sequelize.define("thesis_proposals_model", attributes, options);
  return ThesisProposalsModel;
};