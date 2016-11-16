/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var CahierTexte = sequelize.define(
    'cahierTexte',
    {
      contenu: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          CahierTexte.belongsTo(
            models.matiere_niveau,
            {
              foreignKey: {allowNull: false},
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          CahierTexte.belongsTo(
            models.utilisateur,
            {
              foreignKey:{name:'redacteurId', allowNull:false},
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return CahierTexte;
};