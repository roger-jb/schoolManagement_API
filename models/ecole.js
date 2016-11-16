/**
 * Created by Jean-Baptiste on 16/11/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Ecole = sequelize.define(
    'ecole',
    {

    },
    {
      classMethods: {
        associate: function (models) {
          Ecole.hasMany(
            models.campus,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return Ecole;
};