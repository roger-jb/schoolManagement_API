/**
 * Created by Jean-Baptiste on 16/11/2016.
 */
var models = require('./index');

module.exports = function (sequelize, DataTypes) {
  var Campus = sequelize.define(
    'campus',
    {
      libelle: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
      },
      adr1: {
        type: DataTypes.STRING
      },
      adr2: {
        type: DataTypes.STRING
      },
      cp: {
        type: DataTypes.STRING
      },
      ville: {
        type: DataTypes.STRING
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Campus.belongsTo(
            models.Entreprise,
            {
              foreignKey: {
                allowNull: false
              },
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Campus.belongsToMany(
            models.enseignant,
            {
              through: 'enseignant_campus',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );

        }
      }
    }
  );
  return Campus;
};