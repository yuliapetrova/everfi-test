import {expect} from "chai";
import request from "supertest";

describe('', () => {

    beforeEach(done => setTimeout(done, 500));

    it('should add a product', async () => {

        const response = await request('localhost:3000')
            .post('/vegetable')
            .set('Content-type', 'application/json')
            .send({ name: 'apple', code: '12345', price: '100' });
        expect(response.status).to.be.equal(201);
    });

    it('should get error message when add a product with existing name', async () => {

        const response = await request('localhost:3000')
            .post('/vegetable')
            .set('Content-type', 'application/json')
            .send({ name: 'apple', code: '12345', price: '100' });
        expect(response.status).to.be.equal(400);
        expect(response.body.error).to.be.equal('Product with this name is already exists');
    });

    it('should get error message when add a product with missing price or code', async () => {

        const response = await request('localhost:3000')
            .post('/vegetable')
            .set('Content-type', 'application/json')
            .send({ name: 'orange', price: '100' });
        expect(response.status).to.be.equal(400);
        expect(response.body.error).to.be.equal('Missing required fields name, code and price');
    });

    it('should GET all vegetable names', async () => {

        const response = await request('localhost:3000').get('/vegetable');
        expect(response.status).to.be.equal(200);
        expect(response.body[0]).to.be.equal('apple');
    });

    it('should DELETE vegetable', async () => {

        const response = await request('localhost:3000').delete('/vegetable/apple');
        expect(response.status).to.be.equal(204);
        expect(response.body[0]).to.be.equal('apple');
    });
});
