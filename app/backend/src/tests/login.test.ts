import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../models/user.mode';
import { usersMock } from './users.mock';

chai.use(chaiHttp);

const { expect } = chai;

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

describe('Testes de endpoints de login', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Deve retornar um token de acesso ao encontrar um email existente na base', async () => {
      sinon.stub(UserModel.prototype, 'findByEmail').resolves(usersMock[0]);

      const loginBody = {
        email: usersMock[0].email,
        password: usersMock[0].password
      }

      const response = await chai.request(app).post('/login').send(loginBody);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('token');
      expect(() => jwt.verify(response.body.token, SECRET)).to.not.throw();
    });

    it('Deve retornar um erro ao não encontrar um email existente na base', async () => {
      sinon.stub(UserModel.prototype, 'findByEmail').resolves(null);

      const loginBody = {
        email: 'abc@abc.com',
        password: '123456'
      }

      const response = await chai.request(app).post('/login').send(loginBody);

      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Invalid email or password');
    });

    it('Deve retornar um erro ao encontrar ter uma senha menor que o permitido', async () => {
        sinon.stub(UserModel.prototype, 'findByEmail').resolves(usersMock[1]);
  
        const loginBody = {
          email: 'user@user.com',
          password: '3256'
        }
  
        const response = await chai.request(app).post('/login').send(loginBody);
  
        expect(response.status).to.be.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.eq('Invalid email or password');
      });

    it('Deve retornar um erro ao encontrar um email existente com a senha incorreta', async () => {
        sinon.stub(UserModel.prototype, 'findByEmail').resolves(usersMock[1]);
  
        const loginBody = {
          email: 'user@user.com',
          password: '325637'
        }
  
        const response = await chai.request(app).post('/login').send(loginBody);
  
        expect(response.status).to.be.eq(401);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.eq('Invalid email or password');
      });

      it('Deve negar um login sem senha', async () => {
        sinon.stub(UserModel.prototype, 'findByEmail').resolves(usersMock[1]);
    
        const loginPayload = {
          email: usersMock[1].email,
        };
    
        const chaiResponse = await chai.request(app).post('/login').send(loginPayload);
    
        expect(chaiResponse.status).to.be.equal(400);
        expect(chaiResponse.body).to.have.property('message');
        expect(chaiResponse.body.message).to.be.equal('All fields must be filled');
      });
    
      it('test if cant login without email', async () => {
        sinon.stub(UserModel.prototype, 'findByEmail').resolves(usersMock[1]);
    
        const loginPayload = {
          password: usersMock[1].password,
        };
    
        const chaiResponse = await chai.request(app).post('/login').send(loginPayload);
    
        expect(chaiResponse.status).to.be.equal(400);
        expect(chaiResponse.body).to.have.property('message');
        expect(chaiResponse.body.message).to.be.equal('All fields must be filled');
      });
});