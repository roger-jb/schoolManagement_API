/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Absence = sequelize.define(
    'absence',
    {
      motif: {
        type: DataTypes.TEXT,
        allowNull:false
      },
      dateDebut:{
        type: DataTypes.DATE,
        allowNull: false
      },
      dateFin:{
        type: DataTypes.DATE
      },
      valide:{
        type: DataTypes.BOOLEAN,
        default : false
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Absence.belongsTo(
            models.etudiant,
            {
              foreignKey:{allowNull:false},
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Absence.belongsTo(
            models.utilisateur,
            {
              foreignKey:{name:'redacteurId', allowNull:false},
              onDelete:'restrict',
              onUpdate:'restrict'
            }
          )
        }
      }
    }
  );
  return Absence;
};