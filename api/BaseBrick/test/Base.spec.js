'use strict';
process.env.NODE_ENV = 'testing';

var Code = require('code'),
    Lab = require('lab'),
    lab = exports.lab = Lab.script(),
    suite = lab.suite,
    test = lab.test,
    before = lab.before,
    after = lab.after,
    expect = Code.expect;

lab.experiment('Base - ', function () {

    lab.test('Just a try', function (done) {
        Code.expect(1+1).to.equal(2);
        done();
    });
});