/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var PlanTravail = sequelize.define(
    'plan_travail',
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
          PlanTravail.belongsTo(
            models.periode,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          PlanTravail.belongsTo(
            models.matiere_niveau,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return PlanTravail;
};