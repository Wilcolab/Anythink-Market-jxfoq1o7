const chai = require('chai');
const request = require('supertest')(require('../app')); // Adjust path as needed

const expect = chai.expect;

describe('Addition', function () {
    it('adds two positive integers', function (done) {
        request.get('/arithmetic?operation=add&operand1=10&operand2=15')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 25 });
                done();
            });
    });
    it('adds negative and positive integer', function (done) {
        request.get('/arithmetic?operation=add&operand1=-5&operand2=10')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 5 });
                done();
            });
    });
    it('adds two negative numbers', function (done) {
        request.get('/arithmetic?operation=add&operand1=-7&operand2=-3')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: -10 });
                done();
            });
    });
    it('adds floating point numbers', function (done) {
        request.get('/arithmetic?operation=add&operand1=2.3&operand2=3.7')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 6 });
                done();
            });
    });
    it('adds with exponential notation', function (done) {
        request.get('/arithmetic?operation=add&operand1=1e2&operand2=2e1')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 120 });
                done();
            });
    });
});

describe('Multiplication', function () {
    it('multiplies two positive integers', function (done) {
        request.get('/arithmetic?operation=multiply&operand1=6&operand2=7')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 42 });
                done();
            });
    });
    it('multiplies by zero', function (done) {
        request.get('/arithmetic?operation=multiply&operand1=0&operand2=100')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 0 });
                done();
            });
    });
    it('multiplies negative and positive', function (done) {
        request.get('/arithmetic?operation=multiply&operand1=-3&operand2=5')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: -15 });
                done();
            });
    });
    it('multiplies two negative numbers', function (done) {
        request.get('/arithmetic?operation=multiply&operand1=-4&operand2=-2')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 8 });
                done();
            });
    });
    it('multiplies floating point numbers', function (done) {
        request.get('/arithmetic?operation=multiply&operand1=2.5&operand2=4')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 10 });
                done();
            });
    });
});

describe('Division', function () {
    it('divides two positive integers', function (done) {
        request.get('/arithmetic?operation=divide&operand1=20&operand2=4')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 5 });
                done();
            });
    });
    it('divides by one', function (done) {
        request.get('/arithmetic?operation=divide&operand1=15&operand2=1')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 15 });
                done();
            });
    });
    it('divides negative by positive', function (done) {
        request.get('/arithmetic?operation=divide&operand1=-10&operand2=2')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: -5 });
                done();
            });
    });
    it('divides positive by negative', function (done) {
        request.get('/arithmetic?operation=divide&operand1=10&operand2=-2')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: -5 });
                done();
            });
    });
    it('divides two negative numbers', function (done) {
        request.get('/arithmetic?operation=divide&operand1=-10&operand2=-2')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 5 });
                done();
            });
    });
    it('returns null for division by zero', function (done) {
        request.get('/arithmetic?operation=divide&operand1=10&operand2=0')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: null });
                done();
            });
    });
    it('divides floating point numbers', function (done) {
        request.get('/arithmetic?operation=divide&operand1=7.5&operand2=2.5')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 3 });
                done();
            });
    });
});

describe('Square Root', function () {
    it('returns square root of a positive number', function (done) {
        request.get('/arithmetic?operation=sqrt&operand1=16')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 4 });
                done();
            });
    });
    it('returns square root of zero', function (done) {
        request.get('/arithmetic?operation=sqrt&operand1=0')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 0 });
                done();
            });
    });
    it('returns null for square root of negative number', function (done) {
        request.get('/arithmetic?operation=sqrt&operand1=-9')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: null });
                done();
            });
    });
    it('returns square root of floating point number', function (done) {
        request.get('/arithmetic?operation=sqrt&operand1=2.25')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 1.5 });
                done();
            });
    });
});

describe('General Error Handling', function () {
    it('returns error for unsupported operation', function (done) {
        request.get('/arithmetic?operation=unknown&operand1=1&operand2=2')
            .expect(400)
            .end(function (err, res) {
                expect(res.body).to.eql({ error: "Unsupported operation: unknown" });
                done();
            });
    });
    it('returns error for missing operation', function (done) {
        request.get('/arithmetic?operand1=1&operand2=2')
            .expect(400)
            .end(function (err, res) {
                expect(res.body).to.eql({ error: "Unspecified operation" });
                done();
            });
    });
    it('returns error for extra parameters', function (done) {
        request.get('/arithmetic?operation=add&operand1=1&operand2=2&extra=3')
            .expect(400)
            .end(function (err, res) {
                expect(res.body).to.eql({ error: "Unexpected parameter: extra" });
                done();
            });
    });
});
