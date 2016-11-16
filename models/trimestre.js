/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Semestre = sequelize.define(
    'semestre',
    {
      libelle: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
      },
      dateDebut:{
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      dateFin: {
        type: DataTypes.DATEONLY,
        allowNull:false
      },
      dateFinCommentaire: {
        type: DataTypes.DATEONLY,
        allowNull:false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Semestre.hasMany(
            models.etudiant_cpt_semestre,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return Semestre;
};