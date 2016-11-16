/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Matiere = sequelize.define(
    'matiere',
    {
      libelle: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull:false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Matiere.hasMany(
            models.matiere_niveau,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return Matiere;
};