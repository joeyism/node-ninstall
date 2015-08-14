"use strict";
var expect = require("chai").expect;
var mockery = require("mockery");
var q = require("q");
var pathToNpmSave = "../lib/npm-save";
var npmsave;
var answers = {
    save: "",
    saveDev: ""
};

var createFakeNpmSave = function(defsave, defsavedev){
    return {
        save: function(){
            var deferred = q.defer();
            deferred[defsave]();
            return deferred.promise;
        },
        saveDev: function(){
            var deferred = q.defer();
            deferred[defsavedev]();
            return deferred.promise;
        }
    };
};

describe("npm-save", function(){

    beforeEach(function(done){
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });
        done();
    });

    afterEach(function(done){
        mockery.resetCache();
        mockery.deregisterAll();
        done();
    });


    it("should npm install save and save-dev successfully", function(done){
        mockery.registerMock("npm-save", createFakeNpmSave("resolve","resolve"));
        npmsave = require(pathToNpmSave);

        npmsave(answers).then(function(result){
            expect(result).to.be.undefined;
            done(); 
        });
    });
    
    it("should throw an error when it npm install save and save-dev unsuccessfully", function(done){
        mockery.registerMock("npm-save", createFakeNpmSave("reject","resolve"));
        npmsave = require(pathToNpmSave);

        npmsave(answers).catch(function(result){
            expect(result).to.be.undefined;
            done(); 
        });
    });
});
