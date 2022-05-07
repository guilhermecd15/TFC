interface ITeamAway {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface ITA {
  id: number;
  teamName: string;
  teamAway: ITeamAway[];
}
