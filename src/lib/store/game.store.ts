import { create } from 'zustand';
import { GameState, Position, SpellType, Player } from '../types';
import { GameManager } from '../game/GameManager';

interface GameStore {
  gameState: GameState | null;
  gameManager: GameManager | null;
  selectedSpell: SpellType | null;
  initGame: () => void;
  setPlayerSpells: (playerId: string, spells: SpellType[]) => void;
  startGame: () => void;
  makeMove: (from: Position, to: Position) => boolean;
  selectSpell: (spell: SpellType | null) => void;
  castSpell: (position: Position) => boolean;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: null,
  gameManager: null,
  selectedSpell: null,

  initGame: () => {
    try {
      const gameManager = new GameManager();
      const initialState = gameManager.getInitialState();
      set({ 
        gameManager,
        gameState: {
          ...initialState,
          status: 'selecting_spells',
          remainingSpells: {},
          players: {}
        }
      });
    } catch (error) {
      console.error('Failed to initialize game:', error);
    }
  },

  setPlayerSpells: (playerId: string, spells: SpellType[]) => {
    const { gameState } = get();
    if (!gameState) return;

    const isWhite = playerId === 'player1';
    const player: Player = { id: playerId, selectedSpells: spells };

    const newPlayers = {
      ...gameState.players,
      [isWhite ? 'white' : 'black']: player
    };

    const newRemainingSpells = {
      ...gameState.remainingSpells,
      [playerId]: [...spells]
    };

    set({
      gameState: {
        ...gameState,
        players: newPlayers,
        remainingSpells: newRemainingSpells
      }
    });
  },

  startGame: () => {
    const { gameState, gameManager } = get();
    if (!gameState || !gameManager) return;

    const newGameState = gameManager.getGameState();
    set({
      gameState: {
        ...newGameState,
        status: 'playing',
        players: gameState.players,
        remainingSpells: gameState.remainingSpells
      }
    });
  },

  makeMove: (from: Position, to: Position) => {
    const { gameManager } = get();
    if (!gameManager) return false;

    const success = gameManager.makeMove(from, to);
    if (success) {
      set({ gameState: gameManager.getGameState() });
    }
    return success;
  },

  selectSpell: (spell: SpellType | null) => {
    set({ selectedSpell: spell });
  },

  castSpell: (position: Position) => {
    const { gameManager, selectedSpell, gameState } = get();
    if (!gameManager || !selectedSpell || !gameState) return false;

    const currentPlayerId = gameState.currentTurn === 'white' ? 'player1' : 'player2';
    const success = gameManager.castSpell(selectedSpell, position, currentPlayerId);
    
    if (success) {
      const remainingSpells = {
        ...gameState.remainingSpells,
        [currentPlayerId]: gameState.remainingSpells[currentPlayerId].filter(s => s !== selectedSpell)
      };

      set({ 
        gameState: {
          ...gameManager.getGameState(),
          remainingSpells,
          players: gameState.players
        },
        selectedSpell: null
      });
    }
    return success;
  }
}));