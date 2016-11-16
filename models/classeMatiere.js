/**
 * Created by Jean-Baptiste on 16/11/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var ClasseMatiere = sequelize.define(
    'classe_matiere',
    {
      classeId:{
        type: DataTypes.INTEGER,
        unique: 'idxUniClasseMatiere'
      },
      matiereId:{
        type: DataTypes.INTEGER,
        unique: 'idxUniClasseMatiere'
      }
    },
    {
      classMethods: {
        associate: function (models) {
          ClasseMatiere.belongsTo(
            models.classe,
            {
              foreignKey:{allowNull:false},
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          ClasseMatiere.belongsTo(
            models.matiere,
            {
              foreignKey:{allowNull:false},
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