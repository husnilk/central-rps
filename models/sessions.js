const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "id"
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user_id"
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ip_address"
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user_agent"
    },
    payload: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "payload"
    },
    last_activity: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "last_activity"
    }
  };
  const options = {
    tableName: "sessions",
    comment: "",
    indexes: [{
      name: "sessions_user_id_index",
      unique: false,
      type: "BTREE",
      fields: ["user_id"]
    }, {
      name: "sessions_last_activity_index",
      unique: false,
      type: "BTREE",
      fields: ["last_activity"]
    }]
  };
  const SessionsModel = sequelize.define("sessions_model", attributes, options);
  return SessionsModel;
};