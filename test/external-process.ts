import {expect} from "chai";
import request from "supertest";

describe('', () => {

    it('should GET all vegetable names', async () => {
        const response = await request('localhost:3000').get('/vegetable');
        expect(response.status).to.be.equal(200);
    });
});
