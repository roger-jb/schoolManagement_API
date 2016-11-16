/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Professeur = sequelize.define(
    'professeur',
    {},
    {
      classMethods: {
        associate: function (models) {
          Professeur.belongsTo(models.utilisateur, {foreignKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'});
          Professeur.hasMany(
            models.matiere_niveau,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            });
        }
      }
    }
  );
  return Professeur;
};