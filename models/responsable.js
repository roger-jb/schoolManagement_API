/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Responsable = sequelize.define(
    'responsable',
    {},
    {
      classMethods: {
        associate: function (models) {
          Responsable.belongsTo(
            models.utilisateur,
            {
              foreignKey: 'id',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Responsable.belongsToMany(
            models.eleve,
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
  return Responsable;
};