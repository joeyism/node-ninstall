"use strict";
var inq = require("inquirer");
var q = require("q");
require("colors");
require("xcept");

var confirmAnswers = function(answers){
    Object.keys(answers).forEach(function(question){
        console.log(question.cyan);
        answers[question].split(" ").forEach(function(file){
            console.log("  - ".yellow + file.blue);
        });
    });
};

var creation = function(){

    var deferred = q.defer();

    var questions = [{
        when: function(){
            console.log("Please input the files you would like to save for your " + "module's use".bold + ". Seperate your files with a space.");
            return true;
        },
        message: "Input your --save files: ",
        type: "input",
        name: "save"
    },{
        when: function(){
            console.log("Please input the files you would like to save for your module's "+"development".bold+" use. Seperate your files with a space.");
            return true;
        },
        message: "Input your --save-dev files: ",
        type: "input",
        name: "saveDev"
    }, {
        when: function(result){
            confirmAnswers(result);
            return true;
        },
        type: "confirm",
        name: "confirmation",
        message: "Are these the files you want to install?"
    }];

    inq.prompt(questions, function(answers){
        if(answers.confirmation){
            deferred.resolve(answers.omit("confirmation"));
        }
        else {
            deferred.reject("\nUser elected to exit. Goodbye");
        }
    });

    return deferred.promise;
};

var save = function(){

    var deferred = q.defer();

    var questions = [{
        message: "Would you like to save this configuration?",
        type: "confirm",
        name: "save"
    },{
        when: function(answer){
            return answer.save;
        },
        type: "input",
        name: "configName",
        message: "Please input the name you want to save in this configuration: "
    }];

    inq.prompt(questions, function(answers){
        if(answers.save){
            deferred.resolve(answers.configName);
        }
        else {
            console.log("\nUser elected not to save. Goodbye");
            deferred.reject();
        }
    });

    return deferred.promise;
};

var forConfig = function(confignames){

    var deferred = q.defer();

    var questions = [{
        message: "Please select the configuration you would like to install: ",
        name: "configname",
        type: "list",
        choices: confignames
    }];

    inq.prompt(questions, function(answers){
        deferred.resolve(answers.configname);
    });

    return deferred.promise;
};

module.exports = {
    creation: creation,
    save: save,
    forConfig: forConfig
};
