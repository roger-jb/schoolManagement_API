/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Communication = sequelize.define(
    'communication',
    {
      contenu: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Communication.belongsTo(
            models.utilisateur,
            {
              foreignKey: {
                name: 'redacteurId',
                allowNull: false
              },
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Communication.belongsTo(
            models.classe,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return Communication;
};