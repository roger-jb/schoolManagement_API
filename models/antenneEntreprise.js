/**
 * Created by Jean-Baptiste on 16/11/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var AntenneEntreprise = sequelize.define(
    'antenne_entreprise',
    {
      libelle: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
      },
      adr1: {
        type: DataTypes.STRING
      },
      adr2: {
        type: DataTypes.STRING
      },
      cp: {
        type: DataTypes.STRING
      },
      ville: {
        type: DataTypes.STRING
      }
    },
    {
      classMethods: {
        associate: function (models) {
          AntenneEntreprise.belongsTo(
            models.Entreprise,
            {
              foreignKey: {
                allowNull: false
              },
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          AntenneEntreprise.hasMany(
            models.tuteur,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          AntenneEntreprise.hasMany(
            models.etudiant,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return AntenneEntreprise;
};