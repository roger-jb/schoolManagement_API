/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Module = sequelize.define(
    'module',
    {
      libelle: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Module.hasMany(
            models.niveau,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return Module;
};