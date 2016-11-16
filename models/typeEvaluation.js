/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var TypeEvaluation = sequelize.define(
    'type_evaluation',
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
          TypeEvaluation.hasMany(
            models.evaluation,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return TypeEvaluation;
};