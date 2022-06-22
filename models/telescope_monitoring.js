const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    tag: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tag"
    }
  };
  const options = {
    tableName: "telescope_monitoring",
    comment: "",
    indexes: []
  };
  const TelescopeMonitoringModel = sequelize.define("telescope_monitoring_model", attributes, options);
  return TelescopeMonitoringModel;
};