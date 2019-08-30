import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../src/index';

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('Fetch Article Reactions', () => {
  it('should get all article reactions', (done) => {
    chai.request(index)
      .get('/api/articles/likedislike/TIA')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should get a 404 status when there are no reactions on the article', (done) => {
    chai.request(index)
      .get('/api/articles/likedislike/TIAaaaaaaa')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.a('object');
        done();
      });
  });
});
