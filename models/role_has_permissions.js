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
    }
  };
  const options = {
    tableName: "role_has_permissions",
    comment: "",
    indexes: [{
      name: "role_has_permissions_role_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["role_id"]
    }]
  };
  const RoleHasPermissionsModel = sequelize.define("role_has_permissions_model", attributes, options);
  return RoleHasPermissionsModel;
};