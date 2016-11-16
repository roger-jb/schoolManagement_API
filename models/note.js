/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Note = sequelize.define(
    'note',
    {
      evaluationId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'idxUniNote'
      },
      note:{
        type: DataTypes.FLOAT,
        allowNull: false
      },
      eleveId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'idxUniNote'
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Note.belongsTo(
            models.evaluation,
            {
              foreignKey: 'evaluationId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Note.belongsTo(
            models.etudiant,
            {
              foreignKey : 'eleveId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          )
        }
      }
    }
  );
  return Note;
};