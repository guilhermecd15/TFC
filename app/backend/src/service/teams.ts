import Teams from '../database/models/Teams';

export default class TeamService {
  private teams = Teams;

  public async getAll() {
    const teams = await this.teams.findAll();
    return teams;
  }

  public async findById(id: number) {
    const teams = await this.teams.findByPk(id);
    return teams;
  }
}
