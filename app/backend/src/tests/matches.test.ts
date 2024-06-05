import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { matchMock } from './matches.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando endpoint de matches', () => {
  it ('Deve retornar todas as partidas', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/matches');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(matchMock);
  });

  it ('Deve retornar uma partida específica pelo seu id', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/matches/1');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(matchMock[0]);
  });
});