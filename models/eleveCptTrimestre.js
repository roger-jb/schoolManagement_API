/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var EleveCptTrimestre = sequelize.define(
    'eleve_cpt_trimestre',
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
          EleveCptTrimestre.belongsTo(
            models.trimestre,
            {
              foreignKey: 'trimestreId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EleveCptTrimestre.belongsTo(
            models.eleve,
            {
              foreignKey: 'eleveId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EleveCptTrimestre.belongsTo(
            models.pointCpt,
            {
              foreignKey: 'pointCptId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EleveCptTrimestre.belongsTo(
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
  return EleveCptTrimestre;
};