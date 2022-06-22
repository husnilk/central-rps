const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "id"
    },
    access_token_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "access_token_id"
    },
    revoked: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "revoked"
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "expires_at"
    }
  };
  const options = {
    tableName: "oauth_refresh_tokens",
    comment: "",
    indexes: [{
      name: "oauth_refresh_tokens_access_token_id_index",
      unique: false,
      type: "BTREE",
      fields: ["access_token_id"]
    }]
  };
  const OauthRefreshTokensModel = sequelize.define("oauth_refresh_tokens_model", attributes, options);
  return OauthRefreshTokensModel;
};