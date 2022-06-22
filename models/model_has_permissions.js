const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    permission_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "permission_id",
      references: {
        key: "id",
        model: "permissions_model"
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
    tableName: "model_has_permissions",
    comment: "",
    indexes: [{
      name: "model_has_permissions_model_id_model_type_index",
      unique: false,
      type: "BTREE",
      fields: ["model_id", "model_type"]
    }]
  };
  const ModelHasPermissionsModel = sequelize.define("model_has_permissions_model", attributes, options);
  return ModelHasPermissionsModel;
};