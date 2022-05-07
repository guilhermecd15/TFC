interface ITeamHome {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IT {
  id?: number;
  teamName: string;
  teamHome: ITeamHome[];
}
