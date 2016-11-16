/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var DomaineCpt = sequelize.define(
    'domaineCpt',
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
          DomaineCpt.hasMany(
            models.champCpt,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return DomaineCpt;
};