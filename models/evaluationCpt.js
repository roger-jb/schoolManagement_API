/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var EvaluationCpt = sequelize.define(
    'evaluation_cpt',
    {
      evaluationId: {
        type: DataTypes.INTEGER,
        unique: 'idxUniEvaluationCpt',
        index: true,
        allowNull: false
      },
      pointCptId: {
        type: DataTypes.INTEGER,
        unique: 'idxUniEvaluationCpt',
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          EvaluationCpt.belongsTo(
            models.evaluation,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EvaluationCpt.belongsTo(
            models.pointCpt,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return EvaluationCpt;
};