"use strict";
var expect = require("chai").expect;
var returnConfigName = require("../lib/returnConfigName");

describe("returnConfigName", function(){

    it("should return a promise with the input name", function(done){
        returnConfigName("testname").then(function(result){
            expect(result).to.equal("testname");
            done();
        });
    });
});
