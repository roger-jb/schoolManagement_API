/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var EtudiantSemestreCpt = sequelize.define(
    'etudiant_semestre_cpt',
    {
      semestreId: {
        type: DataTypes.INTEGER,
        unique: 'idxUniEleveCptSemestre',
        allowNull:false
      },
      eleveId: {
        type: DataTypes.INTEGER,
        unique: 'idxUniEleveCptSemestre',
        allowNull:false
      },
      pointCptId: {
        type: DataTypes.INTEGER,
        unique: 'idxUniEleveCptSemestre',
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
          EtudiantSemestreCpt.belongsTo(
            models.semestre,
            {
              foreignKey: 'semestreId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EtudiantSemestreCpt.belongsTo(
            models.etudiant,
            {
              foreignKey: 'eleveId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EtudiantSemestreCpt.belongsTo(
            models.pointCpt,
            {
              foreignKey: 'pointCptId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          EtudiantSemestreCpt.belongsTo(
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
  return EtudiantSemestreCpt;
};