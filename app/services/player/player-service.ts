import { Player, PlayerStats } from '../../models/player/types';
import { BehaviorSubject, Observable } from 'rxjs';

export class PlayerService {
  private static instance: PlayerService;
  private currentPlayer$ = new BehaviorSubject<Player | null>(null);

  private constructor() {}

  static getInstance(): PlayerService {
    if (!PlayerService.instance) {
      PlayerService.instance = new PlayerService();
    }
    return PlayerService.instance;
  }

  getCurrentPlayer$(): Observable<Player | null> {
    return this.currentPlayer$.asObservable();
  }

  async getPlayerStats(playerId: string): Promise<PlayerStats> {
    // TODO: Implement API call to get player stats
    return {
      wins: 0,
      losses: 0,
      draws: 0,
      eloHistory: []
    };
  }

  async updatePlayerDeck(playerId: string, spellDeck: string[]): Promise<void> {
    if (!this.currentPlayer$.value?.isPremium && spellDeck.length > 0) {
      throw new Error('Premium subscription required to customize spell deck');
    }
    // TODO: Implement API call to update player deck
  }

  async updateElo(playerId: string, newElo: number): Promise<void> {
    // TODO: Implement API call to update player ELO
  }
}