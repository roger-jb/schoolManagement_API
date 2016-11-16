/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Trimestre = sequelize.define(
    'trimestre',
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
          Trimestre.hasMany(
            models.periode,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Trimestre.hasMany(
            models.eleve_cpt_trimestre,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return Trimestre;
};