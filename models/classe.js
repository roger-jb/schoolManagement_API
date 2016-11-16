/**
 * Created by Jean-Baptiste on 16/11/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Classe = sequelize.define(
    'classe',
    {
      libelle: {
        type: DataTypes.STRING(255),
        unique: true
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Classe.belongsTo(
            models.niveau,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Classe.hasMany(
            models.classe_matiere,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Classe.belongsToMany(
            models.etudiant,
            {
              through: 'classe_etudiant',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Classe.hasMany(
            models.communication,
            {
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
        }
      }
    }
  );
  return Classe;
};