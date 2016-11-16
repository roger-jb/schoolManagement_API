/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var EtudiantEvaluationCpt = sequelize.define(
    'etudiant_evaluation_cpt',
    {
      evaluationCptId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'idxUniEleveEvalCpt'
      },
      eleveId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'idxUniEleveEvalCpt'
      }

    },
    {
      classMethods: {
        associate: function (models) {
          EtudiantEvaluationCpt.belongsTo(
            models.niveau_cpt,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EtudiantEvaluationCpt.belongsTo(
            models.evaluation_cpt,
            {
              foreignKey: 'evaluationCptId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EtudiantEvaluationCpt.belongsTo(
            models.etudiant,
            {
              foreignKey: 'eleveId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return EtudiantEvaluationCpt;
};