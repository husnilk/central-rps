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
    position: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "position"
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
    created_by: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_by",
      references: {
        key: "id",
        model: "users_model"
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
    tableName: "thesis_supervisors",
    comment: "",
    indexes: [{
      name: "thesis_supervisors_thesis_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["thesis_id"]
    }, {
      name: "thesis_supervisors_lecturer_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["lecturer_id"]
    }, {
      name: "thesis_supervisors_created_by_foreign",
      unique: false,
      type: "BTREE",
      fields: ["created_by"]
    }]
  };
  const ThesisSupervisorsModel = sequelize.define("thesis_supervisors_model", attributes, options);
  return ThesisSupervisorsModel;
};