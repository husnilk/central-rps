const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    role_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "role_id",
      references: {
        key: "id",
        model: "roles_model"
      }
    },
    model_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "model_type"
    },
    model_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "model_id"
    }
  };
  const options = {
    tableName: "model_has_roles",
    comment: "",
    indexes: [{
      name: "model_has_roles_model_id_model_type_index",
      unique: false,
      type: "BTREE",
      fields: ["model_id", "model_type"]
    }]
  };
  const ModelHasRolesModel = sequelize.define("model_has_roles_model", attributes, options);
  return ModelHasRolesModel;
};