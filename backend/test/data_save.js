process.env.NODE_ENV = 'test';

const volunteers = require('../models/Volunteer');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let Should = chai.should();
const expect = chai.use(chaiHttp).expect;

describe('User Register Tests', () => {
    beforeEach(done => {
        volunteers.deleteMany({}, err => {
            done();
        });
    });
    const dummy_data = require('../vol_list');
    it('Should not register incomplete details', async () => {
        dummy_data.forEach(async data => {
            let res1 = await chai
                .request(server)
                .post('/api/volunteers/register')
                .send(data);
            console.log(res1);
        });
    });
});
