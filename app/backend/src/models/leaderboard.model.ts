import ILeaderBoard from '../Interfaces/ILeaderboard';
import ITeam from '../Interfaces/teams/ITeam';
import MatchesModel from './match.model';
import TeamsModel from './team.model';
import TeamPerformance from './teamPerformance';

export default class LeaderBoardModel {
  private matches = new MatchesModel();
  private teams = new TeamsModel();

  private static sortLeaderboardTeams = (a: ILeaderBoard, b: ILeaderBoard) =>
    b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor;

  private static createTeamPerformance(
    teamPerformances: TeamPerformance,
    home: boolean,
  ): ILeaderBoard {
    return {
      totalPoints: teamPerformances.totalPoints(home),
      totalGames: teamPerformances.totalGames(home)
      + teamPerformances.totalDraws() + teamPerformances.totalLosses(home),
      totalVictories: teamPerformances.totalVictories(home),
      totalDraws: teamPerformances.totalDraws(),
      totalLosses: teamPerformances.totalLosses(home),
      goalsFavor: teamPerformances.goalsFavor(home),
      goalsOwn: teamPerformances.goalsOwn(home),
      goalsBalance: teamPerformances.goalsBalance(home),
      efficiency: teamPerformances.efficiency(home),
    };
  }

  private static createTeam(
    team: ITeam,
    teamPerformances: TeamPerformance,
    home: boolean,
  ): ILeaderBoard {
    return {
      name: team.teamName,
      ...LeaderBoardModel.createTeamPerformance(teamPerformances, home),
    };
  }

  private static createTeamsHomeAndAway(
    home: TeamPerformance,
    away: TeamPerformance,
  ): ILeaderBoard {
    const totalPoints = home.totalPoints(true) + away.totalPoints(false);
    const totalGames = home.totalGames(true) + away.totalGames(false);

    const totalPerformance = {
      totalPoints,
      totalGames,
      totalVictories: home.totalVictories(true) + away.totalVictories(false),
      totalDraws: home.totalDraws() + away.totalDraws(),
      totalLosses: home.totalLosses(true) + away.totalLosses(false),
      goalsFavor: home.goalsFavor(true) + away.goalsFavor(false),
      goalsOwn: home.goalsOwn(true) + away.goalsOwn(false),
      goalsBalance: home.goalsBalance(true) + away.goalsBalance(false),
      efficiency: parseFloat(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
    };

    return totalPerformance;
  }

  async leaderBoardsHome(home: boolean): Promise<ILeaderBoard[]> {
    const teams = await this.teams.findAll();
    const matches = await this.matches.findAll();
    return teams.map((team) => {
      const finishedMatches = matches
        .filter((match) => (home
          ? match.homeTeamId === team.id : match.awayTeamId === team.id)
          && match.inProgress === false);
      const performances = new TeamPerformance(finishedMatches);
      return LeaderBoardModel.createTeam(team, performances, home);
    }).sort(LeaderBoardModel.sortLeaderboardTeams);
  }

  async leaderBoardAll(): Promise<ILeaderBoard[]> {
    const teams = await this.teams.findAll();
    const matches = await this.matches.findAll();

    return teams.map((team) => {
      const homeMatches = matches.filter((match) => match.homeTeamId === team.id
      && !match.inProgress);
      const awayMatches = matches.filter((match) => match.awayTeamId === team.id
      && !match.inProgress);

      const home = new TeamPerformance(homeMatches);
      const away = new TeamPerformance(awayMatches);

      const totalPerformance = LeaderBoardModel.createTeamsHomeAndAway(
        home,
        away,
      );
      return {
        name: team.teamName,
        ...totalPerformance,
      };
    }).sort(LeaderBoardModel.sortLeaderboardTeams);
  }
}
