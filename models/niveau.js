/**
 * Created by Jean-Baptiste on 24/10/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Niveau = sequelize.define(
    'niveau',
    {
      libelle: {
        type: DataTypes.STRING(255),
        unique: true
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Niveau.belongsTo(
            models.module,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Niveau.hasMany(
            models.eleve,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Niveau.hasMany(
            models.matiere_niveau,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return Niveau;
};