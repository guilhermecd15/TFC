import { IP } from '../database/interfaces/p';
import { ILearderBoard } from '../database/interfaces/leaderboad';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { IG } from '../database/interfaces/g';
import { ITH } from '../database/interfaces/th';
import { ITA } from '../database/interfaces/ta';

export default class LeaderboardService {
  private teams = Teams;

  public async getHome() {
    return this.teams.findAll({
      include: [{
        model: Matches,
        as: 'teamHome',
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
        where: { inProgress: false },
      }],
    });
  }

  public async getAway() {
    return this.teams.findAll({
      include: [{
        model: Matches,
        as: 'teamAway',
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
        where: { inProgress: false },
      }],
    });
  }
}

export const createObjHome = async (t: ITH, p: IP, g: IG) => {
  let { golPro, golOwn } = g;
  let { win, loss, draw } = p;
  t.teamHome.forEach((ele) => {
    const saldo = ele.homeTeamGoals - ele.awayTeamGoals;
    golPro += ele.homeTeamGoals;
    golOwn += ele.awayTeamGoals;
    if (saldo > 0) win += 1;
    if (saldo < 0) loss += 1;
    if (saldo === 0) draw += 1;
  });
  return { totalPoints: (win * 3 + draw),
    totalGames: (win + loss + draw),
    totalVictories: win,
    totalDraws: draw,
    totalLosses: loss,
    goalsFavor: golPro,
    goalsOwn: golOwn,
    goalsBalance: golPro - golOwn };
};

export const createObjAway = async (t: ITA, p: IP, g: IG) => {
  let { golPro, golOwn } = g;
  let { win, loss, draw } = p;
  t.teamAway.forEach((ele) => {
    const saldo = ele.awayTeamGoals - ele.homeTeamGoals;
    golPro += ele.awayTeamGoals;
    golOwn += ele.homeTeamGoals;
    if (saldo > 0) win += 1;
    if (saldo < 0) loss += 1;
    if (saldo === 0) draw += 1;
  });
  return { totalPoints: (win * 3 + draw),
    totalGames: (win + loss + draw),
    totalVictories: win,
    totalDraws: draw,
    totalLosses: loss,
    goalsFavor: golPro,
    goalsOwn: golOwn,
    goalsBalance: golPro - golOwn };
};

export const createBoardHome = async (teams: any) => {
  const arrResult: ILearderBoard[] = [];
  teams.forEach(async (t: ITH) => {
    const win = 0;
    const loss = 0;
    const draw = 0;
    const golPro = 0;
    const golOwn = 0;
    const g = { golPro, golOwn };
    const p = { win, loss, draw };
    const obj = await createObjHome(t, p, g);
    const obj2 = {
      name: t.teamName,
      ...obj,
      efficiency: Number(((obj.totalPoints / (obj.totalGames * 3)) * 100).toFixed(2)),
    };
    arrResult.push(obj2);
  });
  return arrResult;
};

export const createBoardAway = async (teams: any) => {
  const arrResult: ILearderBoard[] = [];
  teams.forEach(async (t: ITA) => {
    const win = 0;
    const loss = 0;
    const draw = 0;
    const golPro = 0;
    const golOwn = 0;
    const g = { golPro, golOwn };
    const p = { win, loss, draw };
    const obj = await createObjAway(t, p, g);
    const obj2 = {
      name: t.teamName,
      ...obj,
      efficiency: Number(((obj.totalPoints / (obj.totalGames * 3)) * 100).toFixed(2)),
    };
    arrResult.push(obj2);
  });
  return arrResult;
};
