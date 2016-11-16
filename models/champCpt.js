/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var ChampCpt = sequelize.define(
    'champCpt',
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
          ChampCpt.belongsTo(
            models.domaineCpt,
            {
              foreignKey: {
                allowNull: false
              },
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          ChampCpt.hasMany(
            models.pointCpt,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return ChampCpt;
};