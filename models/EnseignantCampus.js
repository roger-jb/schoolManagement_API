/**
 * Created by Jean-Baptiste on 16/11/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var EnseignantCampus = sequelize.define(
    'enseignant_campus',
    {
      enseignantId:{
        type: DataTypes.INTEGER,
        unique: 'idxUniEnseignantCampus'
      },
      campusId:{
        type: DataTypes.INTEGER,
        unique: 'idxUniEnseignantCampus'
      }
    },
    {
      classMethods: {
        associate: function (models) {
          EnseignantCampus.belongsTo(
            models.enseignant,
            {
              foreignKey:{allowNull:false},
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EnseignantCampus.belongsTo(
            models.campus,
            {
              foreignKey:{allowNull:false},
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return EnseignantCampus;
};