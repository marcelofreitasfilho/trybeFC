import IMatches from './IMatches';

type teamName = {
  teamName: string | undefined;
};

interface IMatchesTeams extends IMatches{
  homeTeam: teamName;
  awayTeam: teamName;
}

export default IMatchesTeams;
