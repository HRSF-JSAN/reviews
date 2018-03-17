const request = require('supertest');
const app = require('../../server/serverIndex');


describe('ajax requests', () => {
  let postedReview;
  // GET
  test('server responds to successful GET requests with 200', (done) => {
    request(app)
      .get('/restaurants/123/reviews')
      .expect(200)
      .end(err => (
        err ? done(err) : done()
      ));
  });

  test('server returns an array of reviews', (done) => {
    const checkArray = (res) => {
      if (!(Array.isArray(res.body))) {
        done(new Error('not an array!'));
      }
    };

    request(app)
      .get('/restaurants/101/reviews')
      .expect(checkArray)
      .end(done);
  });

  // // POST
  // test('server responds to successful POST requests with a 201', (done) => {
  //   request(app)
  //     .post('/restaurants/001/reviews')
  //     .send({ rating: 5, review: 'I loved it!', restaurant: 'Amy\'s Baking Company' })
  //     .set('Content-Type', 'application/json')
  //     .expect(201)
  //     .end(err => (
  //       err ? done(err) : done()
  //     ));
  // });

  // test('POST requests create a new review', (done) => {
  //   request(app)
  //     .get('/restaurants/001/reviews')
  //     .then((res) => {
  //       [postedReview] = res.body;
  //       if (res.body[0].reviewBody !== 'I loved it!') {
  //         done(new Error('new review not created!'));
  //       }
  //       done();
  //     });
  // });

  // test('server responds with 404 to POST requests without a review body', (done) => {
  //   request(app)
  //     .post('/restaurants/200/reviews')
  //     .send({ rating: 5 })
  //     .set('Content-Type', 'application/json')
  //     .expect(404)
  //     .end(err => (
  //       err ? done(err) : done()
  //     ));
  // });

  // test('server responds with 404 to POST requests without a review rating', (done) => {
  //   request(app)
  //     .post('/restaurants/200/reviews')
  //     .send({ review: 'I loved it!' })
  //     .set('Content-Type', 'application/json')
  //     .expect(404)
  //     .end(err => (
  //       err ? done(err) : done()
  //     ));
  // });

  // // PUT
  // test('server responds with 200 to a successful PUT request', (done) => {
  //   const id = postedReview['_id']; // eslint-disable-line

  //   request(app)
  //     .put(`/restaurants/001/reviews/${id}`)
  //     .send({ cool: 9 })
  //     .set('Content-Type', 'application/json')
  //     .expect(200)
  //     .end(err => (
  //       err ? done(err) : done()
  //     ));
  // });

  // test('Existing review is updated after a successful PUT request', (done) => {
  //   request(app)
  //     .get('/restaurants/001/reviews')
  //     .expect((res) => {
  //       if (res.body[0].cool !== 9) {
  //         done(new Error('PUT request did not update successfully'));
  //       }
  //     })
  //     .end(done);
  // });

  // test('server responds with 404 to PUT request without body', (done) => {
  //   const id = postedReview['_id']; // eslint-disable-line

  //   request(app)
  //     .put(`/restaurants/001/reviews/${id}`)
  //     .set('Content-Type', 'application/json')
  //     .expect(404)
  //     .end(err => (
  //       err ? done(err) : done()
  //     ));
  // });

  // test('sever responds with 404 to PUT requests with invalid properties to update', (done) => {
  //   const id = postedReview['_id']; // eslint-disable-line

  //   request(app)
  //     .put(`/restaurants/001/reviews/${id}`)
  //     .send({ restaurant: 202 })
  //     .set('Content-Type', 'application/json')
  //     .expect(404)
  //     .end(err => (
  //       err ? done(err) : done()
  //     ));
  // });

  // test('server responds with 404 to PUT requests with multiple properties to update', (done) => {
  //   const id = postedReview['_id']; // eslint-disable-line

  //   request(app)
  //     .put(`/restaurants/001/reviews/${id}`)
  //     .send({ cool: 8, funny: 12 })
  //     .set('Content-Type', 'application/json')
  //     .expect(404)
  //     .end(err => (
  //       err ? done(err) : done()
  //     ));
  // });

  // OTHER ROUTES
  test('server responds to nonexistant routes with 404', (done) => {
    request(app)
      .get('/hello')
      .expect(404)
      .end(err => (
        err ? done(err) : done()
      ));
  });
});

