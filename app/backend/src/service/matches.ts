import Matches from '../database/models/Matches';

export default class MatchesService {
  private matches = Matches;

  public async getAll() {
    const matches = await this.matches.findAll();
    return matches;
  }
}