interface ITeamHome {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface ITH {
  id: number;
  teamName: string;
  teamHome: ITeamHome[];
}
