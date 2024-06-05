import IMatch from '../Interfaces/IMatches';

export default class TeamPerformance {
  private matches: IMatch[];

  constructor(matches: IMatch[]) {
    this.matches = matches;
  }

  totalVictories(home: boolean): number {
    return this.matches.filter((match: IMatch) =>
      (home ? match.homeTeamGoals
        > match.awayTeamGoals : match.awayTeamGoals > match.homeTeamGoals)).length;
  }

  totalDraws(): number {
    return this.matches.filter(
      (match: IMatch) => match.homeTeamGoals === match.awayTeamGoals,
    ).length;
  }

  totalLosses(home: boolean): number {
    return this.matches.filter((match: IMatch) =>
      (home ? match.homeTeamGoals
        < match.awayTeamGoals : match.awayTeamGoals < match.homeTeamGoals)).length;
  }

  goalsFavor(home: boolean): number {
    return this.matches.reduce((totalGoals: number, match: IMatch) =>
      totalGoals + (home ? match.homeTeamGoals : match.awayTeamGoals), 0);
  }

  goalsOwn(home: boolean): number {
    return this.matches.reduce((totalGoals: number, match: IMatch) =>
      totalGoals + (home ? match.awayTeamGoals : match.homeTeamGoals), 0);
  }

  goalsBalance(home: boolean): number {
    return this.goalsFavor(home) - this.goalsOwn(home);
  }

  totalPoints(home: boolean): number {
    const totalVictories = this.totalVictories(home);
    const totalDraws = this.totalDraws();

    return (totalVictories * 3) + totalDraws;
  }

  totalGames(home: boolean): number {
    return this.totalVictories(home)
    + this.totalDraws() + this.totalLosses(home);
  }

  efficiency(home: boolean): number {
    const totalPoints = this.totalPoints(home);
    const totalGames = this.matches.length;

    if (totalGames === 0) return 0.00;

    const efficiency = Number(((totalPoints * 100) / (totalGames * 3)).toFixed(2));

    return efficiency;
  }
}
