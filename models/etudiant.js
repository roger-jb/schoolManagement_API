/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Etudiant = sequelize.define(
    'etudiant',
    {},
    {
      classMethods: {
        associate: function (models) {
          Etudiant.belongsTo(
            models.utilisateur,
            {
              foreignKey: 'id',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Etudiant.belongsToMany(
            models.classe,
            {
              through: 'classe_etudiant',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Etudiant.belongsToMany(
            models.tuteur,
            {
              through: 'etudiant_tuteur',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Etudiant.hasMany(
            models.absence,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Etudiant.hasMany(
            models.bulletin,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Etudiant.hasMany(
            models.carnet_liaison,
            {
              onUpdate: 'restrict',
              onDelete: 'restrict'
            }
          );
          Etudiant.belongsTo(
            models.antenne_entreprise,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Etudiant.hasMany(
            models.note,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Etudiant.hasMany(
            models.etudiant_evaluation_cpt,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Etudiant.hasMany(
            models.etudiant_semestre_cpt,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return Etudiant;
};