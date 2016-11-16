/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var NiveauCpt = sequelize.define(
    'niveau_cpt',
    {
      libelle: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
      },
      code: {
        type: DataTypes.STRING(1),
        unique: true,
        allowNull: false
      },
      point: {
        type: DataTypes.INTEGER(2),
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          NiveauCpt.hasMany(
            models.eleve_evaluation_cpt,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          NiveauCpt.hasMany(
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
  return NiveauCpt;
};