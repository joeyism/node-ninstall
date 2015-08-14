"use strict";
var q = require("q");
var npm = require("npm-save");


var npmSave = function(answers){

    var deferred = q.defer();

    npm.save(answers.save.split(" ")).then(function(){
        
        return npm.saveDev(answers.saveDev.split(" "));
    
    }).then(function(){
    
        deferred.resolve();
    
    }).catch(function(err){
    
        deferred.reject(err);
    
    });

    return deferred.promise;

};

module.exports = npmSave;
