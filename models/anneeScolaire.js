/**
 * Created by Jean-Baptiste on 16/11/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var AnneeScolaire = sequelize.define(
    'annee_scolaire',
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
      }
    },
    {
      classMethods: {
        associate: function (models) {
          AnneeScolaire.hasMany(
            models.semestre,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return AnneeScolaire;
};