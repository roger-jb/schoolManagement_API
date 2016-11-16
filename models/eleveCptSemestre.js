/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var EleveCptSemestre = sequelize.define(
    'etudiant_cpt_semestre',
    {
      trimestreId: {
        type: DataTypes.INTEGER,
        unique: 'idxUniEleveCptTrimestre',
        allowNull:false
      },
      eleveId: {
        type: DataTypes.INTEGER,
        unique: 'idxUniEleveCptTrimestre',
        allowNull:false
      },
      pointCptId: {
        type: DataTypes.INTEGER,
        unique: 'idxUniEleveCptTrimestre',
        allowNull:false
      },
      niveauCptId: {
        type:DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          EleveCptSemestre.belongsTo(
            models.semestre,
            {
              foreignKey: 'trimestreId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EleveCptSemestre.belongsTo(
            models.etudiant,
            {
              foreignKey: 'eleveId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EleveCptSemestre.belongsTo(
            models.pointCpt,
            {
              foreignKey: 'pointCptId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EleveCptSemestre.belongsTo(
            models.niveau_cpt,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return EleveCptSemestre;
};