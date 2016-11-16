/**
 * Created by Jean-Baptiste on 19/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Administrateur = sequelize.define(
    'administrateur',
    {},
    {
      classMethods: {
        associate: function (models) {
          Administrateur.belongsTo(models.utilisateur, {foreignKey: 'id', onDelete: 'restrict', onUpdate: 'restrict'});
        }
      }
    }
  );
  return Administrateur;
};