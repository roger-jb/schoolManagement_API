/**
 * Created by Jean-Baptiste on 15/10/2016.
 */

var _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  var Utilisateur = sequelize.define(
    'utilisateur',
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prenom: {
        type: DataTypes.STRING,
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
      },
      actif: {
        type: DataTypes.BOOLEAN,
        defaultValue: '1'
      },
      mail: {
        type: DataTypes.STRING
      },
      dateNaissance: {
        type: DataTypes.DATEONLY
      }
    },
    {
      classMethods: {
        associate: function (models) {
          Utilisateur.hasOne(
            models.connexion,
            {
              foreignKey: 'id',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Utilisateur.hasOne(
            models.administrateur,
            {
              foreignKey: 'id',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Utilisateur.hasOne(
            models.responsable,
            {
              foreignKey: 'id',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Utilisateur.hasOne(
            models.eleve,
            {
              foreignKey: 'id',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Utilisateur.hasOne(
            models.professeur,
            {
              foreignKey: 'id',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Utilisateur.hasMany(
            models.absence,
            {
              foreignKey: 'redacteurId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Utilisateur.hasMany(
            models.cahierTexte,
            {
              foreignKey: 'redacteurId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Utilisateur.hasMany(
            models.carnetLiaison,
            {
              foreignKey: 'redacteurId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          );
          Utilisateur.hasMany(
            models.communication,
            {
              foreignKey: 'redacteurId',
              onDelete: 'restrict',
              onUpdate: 'restrict'
            }
          )
        }
      },
      instanceMethods:{
        fullName: function(){
          return [this.prenom, _.upperCase(this.nom)].join(' ');
        },
        login: function(){
          return [this.prenom, _.upperCase(this.nom)].join('.')
        },
        getNom: function(){
          this.nom = _.upperCase(this.nom);
          return this.nom;
        },
        getPrenom: function(){
          var aPrenom = _.split(this.prenom, '-');
          var sPrenom = "";
          _.each(aPrenom, function(item){
            sPrenom += _.upperFirst(_.lowerCase(item)) +'-';
          });
          this.prenom = sPrenom.slice(0, -1);
          return this.prenom;
        }
      }
    }
  );

  Utilisateur.beforeUpdate(function(user, options){
    user.nom = _.upperCase(user.nom);
    var aPrenom = _.split(user.prenom, '-');
    var sPrenom = "";
    _.each(aPrenom, function(item){
      sPrenom += _.upperFirst(_.lowerCase(item)) +'-';
    });
    user.prenom = sPrenom.slice(0, -1);
  });

  Utilisateur.beforeCreate(function(user, options){
    user.nom = _.upperCase(user.nom);
    var aPrenom = _.split(user.prenom, '-');
    var sPrenom = "";
    _.each(aPrenom, function(item){
      sPrenom += _.upperFirst(_.lowerCase(item)) +'-';
    });
    user.prenom = sPrenom.slice(0, -1);
  });

  return Utilisateur;
};