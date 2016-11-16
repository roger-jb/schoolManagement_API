/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var PointCpt = sequelize.define(
    'pointCpt',
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
          PointCpt.belongsTo(
            models.champCpt,
            {
              foreignKey: {
                allowNull: false
              },
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          PointCpt.hasMany(
            models.evaluation_cpt,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          PointCpt.hasMany(
            models.eleve_cpt_trimestre,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return PointCpt;
};