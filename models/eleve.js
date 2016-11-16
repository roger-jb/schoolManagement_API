/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Eleve = sequelize.define(
    'eleve',
    {},
    {
      classMethods: {
        associate: function (models) {
          Eleve.belongsTo(
            models.utilisateur,
            {
              foreignKey: 'id',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Eleve.belongsTo(
            models.niveau,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Eleve.belongsToMany(
            models.responsable,
            {
              through: 'eleve_responsable',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Eleve.hasMany(
            models.absence,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Eleve.hasMany(
            models.bulletin,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Eleve.hasMany(
            models.carnetLiaison,
            {
              onUpdate: 'restrict',
              onDelete: 'restrict'
            }
          );
          Eleve.hasMany(
            models.note,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Eleve.hasMany(
            models.eleve_evaluation_cpt,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Eleve.hasMany(
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
  return Eleve;
};