/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var CarnetLiaison = sequelize.define(
    'carnetLiaison',
    {
      contenu: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          CarnetLiaison.belongsTo(
            models.utilisateur,
            {
              foreignKey : {
                name: 'redacteurId',
                allowNull: false
              },
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          CarnetLiaison.belongsTo(
            models.etudiant,
            {
              foreignKey: {
                allowNull: false
              },
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          CarnetLiaison.belongsTo(
            models.carnetLiaison,
            {
              foreignKey: 'messageOrigineId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          CarnetLiaison.hasOne(
            models.carnetLiaison,
            {
              foreignKey:'messageOrigineId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return CarnetLiaison;
};