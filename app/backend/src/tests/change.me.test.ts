import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Users from '../database/models/Users';

const { admin: { validAdmin, invalidAdmin }, user: { validUser } } = require('../../../../__tests__/utils/users');

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  describe('Post Login', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(validAdmin as Users);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('Sucesso', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ email: validAdmin.email, password: validAdmin.password })
      
      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body.user).to.be.keys('id', 'username', 'role', 'email');
    });

    it('Email invalido', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ email: 'validAdmin.email', password: validAdmin.password })
      
      expect(chaiHttpResponse.status).to.be.equal(401)
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('Senha invalida', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ email: validAdmin.email, password: '12345' })
      
      expect(chaiHttpResponse.status).to.be.equal(401)
      expect(chaiHttpResponse.body.message).to.be.equal('Password must have at least 6 characters');
    });

    it('Sem email', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ password: 'validAdmin.password' })
      
      expect(chaiHttpResponse.status).to.be.equal(400)
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it('Sem senha', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ email: validAdmin.email })
      
      expect(chaiHttpResponse.status).to.be.equal(400)
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  });
});
