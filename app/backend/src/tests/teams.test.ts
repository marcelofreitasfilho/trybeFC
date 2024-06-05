import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsMock from './teams.mock';
import TeamModel from '../models/team.model';
import TeamModelSequelize from '../database/models/TeamModelSequelize';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de endpoints dos times', () => {
  const all = sinon.stub(TeamModel.prototype, 'findAll');
  const id = sinon.stub(TeamModel.prototype, 'findById');

  beforeEach(() => {
    all.resolves(TeamsMock);
    id.resolves(TeamsMock[0]);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Deve retornar todos os times', async () => {
    const response: Response = await chai.request(app).get('/teams');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(TeamsMock);
  });

  it('Deve retornar um time pelo id', async () => {
    const response: Response = await chai.request(app).get(`/teams/${TeamsMock[0].id}`);

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(TeamsMock[0]);
  });

});

