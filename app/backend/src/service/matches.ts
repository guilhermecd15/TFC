import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesService {
  private matches = Matches;

  public async getAll() {
    const matches = await this.matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  }

  public async create(body: object) {
    const match = await this.matches.create({ ...body });
    return match;
  }

  public async finish(id: number) {
    const match = await this.matches.update({ inProgress: false }, { where: { id } });
    return match;
  }

  public async update(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await this.matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return match;
  }
}
