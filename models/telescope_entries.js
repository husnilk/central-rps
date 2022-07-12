const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    sequence: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "sequence"
    },
    uuid: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "uuid",
      unique: "telescope_entries_uuid_unique"
    },
    batch_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "batch_id"
    },
    family_hash: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "family_hash"
    },
    should_display_on_index: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "should_display_on_index"
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "type"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "content"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_at"
    }
  };
  const options = {
    tableName: "telescope_entries",
    comment: "",
    indexes: [{
      name: "telescope_entries_batch_id_index",
      unique: false,
      type: "BTREE",
      fields: ["batch_id"]
    }, {
      name: "telescope_entries_family_hash_index",
      unique: false,
      type: "BTREE",
      fields: ["family_hash"]
    }, {
      name: "telescope_entries_created_at_index",
      unique: false,
      type: "BTREE",
      fields: ["created_at"]
    }, {
      name: "telescope_entries_type_should_display_on_index_index",
      unique: false,
      type: "BTREE",
      fields: ["type", "should_display_on_index"]
    }]
  };
  const TelescopeEntriesModel = sequelize.define("telescope_entries_model", attributes, options);
  return TelescopeEntriesModel;
};