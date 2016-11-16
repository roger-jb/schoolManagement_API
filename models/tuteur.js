/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Tuteur = sequelize.define(
    'tuteur',
    {},
    {
      classMethods: {
        associate: function (models) {
          Tuteur.belongsTo(
            models.utilisateur,
            {
              foreignKey: 'id',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Tuteur.belongsTo(
            models.antenne_entreprise,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Tuteur.belongsToMany(
            models.etudiant,
            {
              through: 'eleve_responsable',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return Tuteur;
};