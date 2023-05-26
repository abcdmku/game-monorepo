import {playerNumber, roomDataProps} from './helpers';
import { User } from '@game-mr/helpers';


const roomDataExample = {
  room1: {
    players: { 
      [1]:{
        user: {id: '1234', name: 'username1', token: 'abcd' },
        guesses: [
          { guess: '12345', n: 1, p: 0 },
          { guess: '02468', n: 2, p: 1 },
          { guess: '01234', n: 1, p: 0 },
        ],
        number: '98765'
      },
      [2]:{
        user: {id: '5678', name: 'username2', token: 'wxyz' },
        guesses: [
          { guess: '12345', n: 1, p: 0 },
          { guess: '02468', n: 2, p: 1 },
          { guess: '01234', n: 1, p: 0 },
        ],
        number: '98765'
      }
    },
    maxPlayers: 2,
    turn: 2,
    state: 2
  }
} as {[x:string]:roomDataProps}

const player1 = {id: '1234', name: 'username1', token: 'abcd' } as User
const player2 = {id: '5678', name: 'username2', token: 'wxyz' } as User

describe('playerNumber', () => {
  it('should return the players number', () => {
    expect(playerNumber(roomDataExample.room1.players, player1)).toBe(1);
    expect(playerNumber(roomDataExample.room1.players, player2)).toBe(2);
  });
});
