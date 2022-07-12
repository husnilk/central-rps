const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    entry_uuid: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "entry_uuid",
      references: {
        key: "uuid",
        model: "telescope_entries_model"
      }
    },
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
    tableName: "telescope_entries_tags",
    comment: "",
    indexes: [{
      name: "telescope_entries_tags_entry_uuid_tag_index",
      unique: false,
      type: "BTREE",
      fields: ["entry_uuid", "tag"]
    }, {
      name: "telescope_entries_tags_tag_index",
      unique: false,
      type: "BTREE",
      fields: ["tag"]
    }]
  };
  const TelescopeEntriesTagsModel = sequelize.define("telescope_entries_tags_model", attributes, options);
  return TelescopeEntriesTagsModel;
};