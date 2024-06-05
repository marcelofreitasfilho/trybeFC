import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { leaderBoardAll, leaderBoardAway, leaderBoardHome } from './leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes leaderboard', () => {

  it ('Should return a leaderBoard pelo nome do time', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderBoard/Avaí/Kindermann');
  
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(leaderBoardAll[0]);
  });


  it ('Deve retornar lraderboardcompleta', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderBoard');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(leaderBoardAll);
  });

  it ('Deve retornar leaderboard de time da casa pelo id', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderBoard/home/1');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(leaderBoardHome[0]);
  });
  
  it ('Deve retornar leaderboard de fora de casa por nome e id', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderBoard/away/1/Avaí/Kindermann');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(leaderBoardAway[0]);
  });
  
});