/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Connexion = sequelize.define(
    'connexion',
    {
      login: {
        allowNull: false,
        type: DataTypes.STRING(255),
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255)
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Connexion.belongsTo(
            models.utilisateur,
            {
              foreignKey: 'id',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return Connexion;
};