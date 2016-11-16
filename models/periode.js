/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Periode = sequelize.define(
    'periode',
    {
      libelle: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull:false
      },
      dateDebut:{
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      dateFin:{
        type: DataTypes.DATEONLY,
        allowNull:false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Periode.belongsTo(
            models.trimestre,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Periode.hasMany(
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
  return Periode;
};