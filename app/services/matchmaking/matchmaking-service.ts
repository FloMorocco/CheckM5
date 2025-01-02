import { Player } from '../../models/player/types';
import { BehaviorSubject, Observable } from 'rxjs';

interface MatchRequest {
  playerId: string;
  playerElo: number;
  timestamp: number;
}

export class MatchmakingService {
  private static instance: MatchmakingService;
  private activeMatch$ = new BehaviorSubject<string | null>(null);

  private constructor() {}

  static getInstance(): MatchmakingService {
    if (!MatchmakingService.instance) {
      MatchmakingService.instance = new MatchmakingService();
    }
    return MatchmakingService.instance;
  }

  async findMatch(player: Player): Promise<string> {
    // TODO: Implement matchmaking logic
    return 'match_id';
  }

  async cancelMatchmaking(playerId: string): Promise<void> {
    // TODO: Implement cancel matchmaking
  }

  getActiveMatch$(): Observable<string | null> {
    return this.activeMatch$.asObservable();
  }

  async createPrivateMatch(creatorId: string): Promise<string> {
    // TODO: Implement private match creation
    return 'match_id';
  }

  async joinPrivateMatch(matchId: string, playerId: string): Promise<boolean> {
    // TODO: Implement joining private match
    return true;
  }
}