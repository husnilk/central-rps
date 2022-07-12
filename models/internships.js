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
    proposal_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "proposal_id",
      references: {
        key: "id",
        model: "internship_proposals_model"
      }
    },
    student_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "student_id",
      references: {
        key: "id",
        model: "students_model"
      }
    },
    advisor_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "advisor_id",
      references: {
        key: "id",
        model: "lecturers_model"
      }
    },
    status: {
      type: DataTypes.ENUM('Diterima', 'Ditolak', 'Selesai', 'Dibatalkan', 'Sedang KP', 'Seminar', 'Berkas seminar tidak lengkap', 'Berkas seminar tidak sesuai', 'Seminar verified', 'Berkas KP tidak lengkap', 'Berkas KP tidak sesuai', 'Berkas KP verified', 'Selesai Praktek Lapangan'),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "status"
    },
    start_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "start_at"
    },
    end_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "end_at"
    },
    report_title: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "report_title"
    },
    seminar_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "seminar_date"
    },
    seminar_room_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "seminar_room_id",
      references: {
        key: "id",
        model: "rooms_model"
      }
    },
    link_seminar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "link_seminar"
    },
    seminar_deadline: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "seminar_deadline"
    },
    attendees_list: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "attendees_list"
    },
    internship_score: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "internship_score"
    },
    activity_report: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "activity_report"
    },
    news_event: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "news_event"
    },
    work_report: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "work_report"
    },
    certificate: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "certificate"
    },
    report_receipt: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "report_receipt"
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
    tableName: "internships",
    comment: "",
    indexes: [{
      name: "internships_seminar_room_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["seminar_room_id"]
    }, {
      name: "internships_proposal_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["proposal_id"]
    }, {
      name: "internships_student_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["student_id"]
    }, {
      name: "internships_advisor_id_foreign",
      unique: false,
      type: "BTREE",
      fields: ["advisor_id"]
    }]
  };
  const InternshipsModel = sequelize.define("internships_model", attributes, options);
  return InternshipsModel;
};