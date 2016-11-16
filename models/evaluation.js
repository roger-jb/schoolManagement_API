/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Evaluation = sequelize.define(
    'evaluation',
    {
      titre: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      date:{
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      detail: {
        type: DataTypes.STRING(255)
      },
      noteMax: {
        type: DataTypes.INTEGER(2),
        defaultValue: 20,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Evaluation.belongsTo(
            models.type_evaluation,
            {
              foreignKey: {allowNull:false},
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Evaluation.belongsTo(
            models.classe_matiere,
            {
              foreignKey: {allowNull:false},
              onDelete: 'restrict',
              onUpdate:'restrict'
            }
          );
          Evaluation.hasMany(
            models.note,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Evaluation.hasMany(
            models.evaluation_cpt,
            {
              foreignKey: {allowNull:false},
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          )
        }
      }
    }
  );
  return Evaluation;
};