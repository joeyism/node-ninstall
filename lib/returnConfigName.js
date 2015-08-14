"use strict";
var q = require("q");

var returnConfigName = function(name){
    var deferred = q.defer();
    deferred.resolve(name);
    return deferred.promise;
};

module.exports = returnConfigName;
