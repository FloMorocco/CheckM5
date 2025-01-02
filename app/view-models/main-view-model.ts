import { Observable } from '@nativescript/core';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';

export class MainViewModel extends Observable {
  private authService: AuthService;
  private gameService: GameService;

  constructor() {
    super();
    this.authService = AuthService.getInstance();
    this.gameService = GameService.getInstance();
  }

  onNewGameTap() {
    // Navigate to local game setup
    console.log('New Game tapped');
  }

  onCreateOnlineGameTap() {
    // Navigate to online game creation
    console.log('Create Online Game tapped');
  }

  onJoinOnlineGameTap() {
    // Navigate to game joining screen
    console.log('Join Online Game tapped');
  }

  onLeaderboardTap() {
    // Navigate to leaderboard
    console.log('Leaderboard tapped');
  }

  onUpgradePlanTap() {
    // Navigate to upgrade plan screen
    console.log('Upgrade Plan tapped');
  }
}