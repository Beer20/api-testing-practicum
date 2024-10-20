const request = require('supertest');
const {expect} = require('chai');
const app = require('../src/app');

describe('API tesing', () => {
    it('should returns all items', (done) => {
        request(app)
        .get('/api/items')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.at.least(1);
            done();
        });
    });

    it('should create new item', (done) => {
        const newItem = {name: 'Item 3'};
        request (app)
            .post('/api/items')
            .send(newItem)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('name', 'Item 3');
                done();
        });

    });
    it('should delete an item', (done) => {
        // Assuming we know there's an item with id 1
        const itemIdToDelete = 1;

        request(app)
            .delete(`/api/items/${itemIdToDelete}`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message', 'Item deleted successfully');

                // Verify the item is actually deleted
                request(app)
                    .get('/api/items')
                    .end((err, getRes) => {
                        expect(getRes.status).to.equal(200);
                        expect(getRes.body).to.be.an('array');
                        const deletedItem = getRes.body.find(item => item.id === itemIdToDelete);
                        expect(deletedItem).to.be.undefined;
                        done();
                    });
            });
    });

    it('should update an item', (done) => {
        // Assuming we know there's an item with id 2
        const itemIdToUpdate = 2;
        const updatedData = { name: 'Updated Item 2' };

        request(app)
            .put(`/api/items/${itemIdToUpdate}`)
            .send(updatedData)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('id', itemIdToUpdate);
                expect(res.body).to.have.property('name', 'Updated Item 2');

               
                request(app)
                    .get('/api/items')
                    .end((err, getRes) => {
                        expect(getRes.status).to.equal(200);
                        expect(getRes.body).to.be.an('array');
                        const updatedItem = getRes.body.find(item => item.id === itemIdToUpdate);
                        expect(updatedItem).to.not.be.undefined;
                        expect(updatedItem.name).to.equal('Updated Item 2');
                        done();
                    });
            });
    });

    
});
