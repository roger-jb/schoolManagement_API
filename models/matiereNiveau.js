/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var MatiereNiveau = sequelize.define(
    'matiere_niveau',
    {
      matiereId:{
        type: DataTypes.INTEGER,
        unique: 'idxUniMatiereNiveau'
      },
      niveauId:{
        type: DataTypes.INTEGER,
        unique: 'idxUniMatiereNiveau'
      }
    },
    {
      classMethods: {
        associate: function (models) {
          MatiereNiveau.belongsTo(
            models.matiere,
            {
              foreignKey:{allowNull:false},
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          MatiereNiveau.belongsTo(
            models.niveau,
            {
              foreignKey:{allowNull:false},
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          MatiereNiveau.belongsTo(
            models.professeur,
            {
              onDelete:'restrict',
              onUpdate:'restrict'
            }
          );
          MatiereNiveau.hasMany(
            models.bulletin,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          MatiereNiveau.hasMany(
            models.cahierTexte,
            {
              onDelete:'restrict',
              onUpdate: 'restrict'
            }
          );
          MatiereNiveau.hasMany(
            models.evaluation,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          MatiereNiveau.hasMany(
            models.plan_travail,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          )
        }
      }
    }
  );
  return MatiereNiveau;
};