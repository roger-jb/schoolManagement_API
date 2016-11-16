/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Enseignant = sequelize.define(
    'enseignant',
    {},
    {
      classMethods: {
        associate: function (models) {
          Enseignant.belongsTo(
            models.utilisateur,
            {
              foreignKey: 'id',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Enseignant.hasMany(
            models.matiere_niveau,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Enseignant.belongsToMany(
            models.campus,
            {
              through: 'enseignant_campus',
              onUpdate: 'restrict',
              onDelete: 'restrict'
            }
          )
        }
      }
    }
  );
  return Enseignant;
};