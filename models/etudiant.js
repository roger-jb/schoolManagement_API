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
          Etudiant.belongsTo(
            models.classe,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Etudiant.belongsToMany(
            models.tuteur,
            {
              through: 'eleve_responsable',
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
            models.carnetLiaison,
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
  return Etudiant;
};