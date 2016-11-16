/**
 * Created by Jean-Baptiste on 16/11/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var ClasseMatiere = sequelize.define(
    'classe_matiere',
    {
      libelle: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      code: {
        type: DataTypes.STRING(255),
        unique: true
      }
    },
    {
      classMethods: {
        associate: function (models) {
          ClasseMatiere.belongsTo(
            models.classe,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          ClasseMatiere.belongsTo(
            models.matiere,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          ClasseMatiere.hasMany(
            models.evaluation,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          )
        }
      }
    }
  );
  return ClasseMatiere;
};