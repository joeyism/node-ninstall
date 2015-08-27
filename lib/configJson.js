"use strict";
var JsonData = require("jsondata");
var jsondata = new JsonData();
var q = require("q");
var path = require("path");
var filename = path.join(process.env.HOME, ".savedConfig.json");

var loadKeys = function(){
    var deferred = q.defer();
    jsondata.load(filename, function(err, result){
        if (err) return deferred.reject(err);
        var keys = Object.keys(result);
        if (keys.length > 0){
            deferred.resolve(keys);
        }
        else {
            deferred.reject("You have not saved any previous configuration. If you want to save configurations, run 'ninstall new'");
        }
    });
    return deferred.promise;
};

var get = function(key){
    var deferred = q.defer();
    deferred.resolve(jsondata.data[key]);

    return deferred.promise;
};

var save = function(answers, configname){
    var deferred = q.defer();
    var newData = {};
    newData[configname] = answers;
    jsondata.add(newData);
    jsondata.save(filename, function(err){
        if (err) return deferred.reject(err);
        deferred.resolve();
    });

    return deferred.promise;
};


module.exports = {
    save: save,
    loadKeys: loadKeys,
    get: get
};
