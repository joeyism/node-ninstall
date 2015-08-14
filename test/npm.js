"use strict";
var expect = require("chai").expect;
var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;
var fs = require('fs');
var copy = require("copy");
var rimraf = require('rimraf');
var npm = require("../lib/npm");

var clean = function(source, cwd){
    process.chdir(cwd);
    rimraf.sync(source);
};

describe("npm", function(){

    describe("save", function(){

        it("should save the intended npm modules", function(done){
            var cwd = process.cwd();
            var dest = path.join(__dirname, "temp/");
            var source = path.join(cwd, "test/testFolder/");
            copy.dir(source, dest, function(err, files){
                process.chdir(dest);
                console.log("here1");
                npm.save(["kontains"],function(err, result){
                    console.log("here2");
                    console.log(err);
                    console.log(result);

                    //clean(dest, cwd);
                    done();
                });         
            });
        });
    });
});
