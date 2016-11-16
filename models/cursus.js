/**
 * Created by Jean-Baptiste on 16/11/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Cursus = sequelize.define(
    'cursus',
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
          Cursus.hasMany(
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
  return Cursus;
};