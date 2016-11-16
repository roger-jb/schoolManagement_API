/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Bulletin = sequelize.define(
    'bulletin',
    {
      contenu: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Bulletin.belongsTo(
            models.etudiant,
            {
              foreignKey: {allowNull:false},
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Bulletin.belongsTo(
            models.matiere_niveau,
            {
              foreignKey: {allowNull:false},
              onDelete:'restrict',
              onUpdate:'restrict'
            }
          );
        }
      }
    }
  );
  return Bulletin;
};