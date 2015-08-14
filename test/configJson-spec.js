"use strict";
var expect = require("chai").expect;
var mockery = require("mockery");
var pathToConfigJson = "../lib/configJson";
var configJson;

describe("configJson", function(){

    describe("get", function(){

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

        it("should get jsondata data from a key", function(done){
            mockery.registerMock("jsondata", function(){
                this.data = {
                    "this": "data"
                }
            });
            configJson = require(pathToConfigJson);

            configJson.get("this").then(function(result){
                expect(result).to.equal("data");
                done();
            });
        });
    });

    describe("loadKeys", function(){

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

        it("should successfully load keys", function(done){
            mockery.registerMock("jsondata", function(){
                this.load = function(filename, callback){
                    callback(null, {"some": "object"});
                };
            }); 
            configJson = require(pathToConfigJson);

            configJson.loadKeys().then(function(keys){
                expect(keys).to.deep.equal(["some"]);
                done();
            });
        });

        it("should throw an error when it load keys but it's empty", function(done){
            mockery.registerMock("jsondata", function(){
                this.load = function(filename, callback){
                    callback(null, {});
                };
            }); 
            configJson = require(pathToConfigJson);

            configJson.loadKeys().catch(function(error){
                expect(error).to.equal("You have not saved any previous configuration");
                done();
            });
        });

        it("should throw an error when jsondata.load throws an error", function(done){
            mockery.registerMock("jsondata", function(){
                this.load = function(filename, callback){
                    callback("error");
                };
            }); 
            configJson = require(pathToConfigJson);

            configJson.loadKeys().catch(function(error){
                expect(error).to.equal("error");
                done();
            });
        });
    });

    describe("save", function(){

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

        it("should successfully saves data", function(done){
            mockery.registerMock("jsondata", function(){
                this.add = function(){};
                this.save = function(filename, callback){
                    callback(null);
                }; 
            }); 
            configJson = require(pathToConfigJson);
            
            configJson.save({}, "key").then(function(result){
                expect(result).to.be.undefined;
                done();
            });
        });
        
        it("should throw an error when jsondata.save throws an error", function(done){
            mockery.registerMock("jsondata", function(){
                this.add = function(){};
                this.save = function(filename, callback){
                    callback("error");
                }; 
            }); 
            configJson = require(pathToConfigJson);
            
            configJson.save({}, "key").catch(function(result){
                expect(result).to.equal("error");
                done();
            });
        });
    });
});
