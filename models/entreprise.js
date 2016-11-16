/**
 * Created by Jean-Baptiste on 16/11/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Entreprise = sequelize.define(
    'Entreprise',
    {
      libelle: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Entreprise.hasMany(
            models.antenne_entreprise,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return Entreprise;
};