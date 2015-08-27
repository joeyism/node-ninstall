#!/usr/bin/env node
"use strict";
var prompt = require("./lib/prompt");
var configJson = require("./lib/configJson");
var npmSave = require("./lib/npm-save");
var returnConfigName = require("./lib/returnConfigName");
require("colors");
var params = process.argv;
var answers;


if (params[2] === "new"){

    prompt.creation().then(function(result){

        answers = result;
        return npmSave(result);

    }).then(function(){

        return configJson.loadKeys({new: true});

    }).then(function(){

        return prompt.save();

    }).then(function(result){

        return configJson.save(answers, result);

    }).then(function(result){
    
        console.log(result.green.bold);
    
    }).catch(function(err){

        console.log(err.toString().red);

    });

}
else {

    configJson.loadKeys().then(function(confignames){

        if (params[2]){
            return returnConfigName(params[2]);
        }
        else {
            return prompt.forConfig(confignames);
        }

    }).then(function(configname){

        return configJson.get(configname);

    }).then(function(result){

        answers = result;
        return npmSave(result);

    }).catch(function(err){

        console.log(err.toString().red);

    }); 

}
