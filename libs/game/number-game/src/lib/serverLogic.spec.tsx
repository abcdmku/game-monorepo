import { roomInitState} from './helpers';
import { User } from '@game-mr/helpers';
import { serverState } from './serverLogic'

const player1 = {id: '1234', name: 'username1', token: 'abcd' } as User
const player2 = {id: '5678', name: 'username2', token: 'wxyz' } as User
const guess = {guess: '12345', n:0, p:0}

describe('serverState', () => {
  const testState = {...serverState}

  it('should have no room data at first ', () => {
    expect(testState.roomData).toStrictEqual({});
  });

  it('initRoom should setup room1 with default state', () => {
    testState.initRoom('room1')
    expect(testState.roomData).toStrictEqual({room1: roomInitState});
  });

  it('addUser should add player1 to room1', () => {
    const numOfPlayers = testState.addUser('room1', player1)
    expect(numOfPlayers).toBe(1);
    expect(testState.roomData['room1'].players).toStrictEqual({"1": { guesses: [], number: "", user: player1}});
  });

  it('addGuess should add a guess to player1 in room1', () => {
    testState.addGuess('room1', player1, guess)
    const p1Guesses = testState.roomData['room1'].players['1'].guesses
    expect(p1Guesses.length).toBe(1);
    expect(p1Guesses[0]).toStrictEqual(guess);
  });

  it('addGuess should add a guess to player1 in room1', () => {
    const p1Guesses = testState.getPlayerGuesses('room1', player1)
    expect(p1Guesses.length).toBe(1);
    expect(p1Guesses[0]).toStrictEqual('12345');
  });

  it('setRoomState should update room1 state', () => {
    expect(testState.roomData['room1'].state).toBe(0);
    testState.setRoomState('room1', 2)
    expect(testState.roomData['room1'].state).toBe(2);
  });

  it('getPlayerNumber of player1 should return players number', () => {
    expect(testState.getPlayerNumber('room1', player1)).toBe(1);
  });

  it('setPlayerNumber should set players number to guess in room1', () => {
    testState.setPlayerNumber('room1', player1, '12345')
    expect(testState.roomData['room1'].players['1'].number).toBe('12345');
  });

  it('playersAddedNumbers should return true if every player added a number', () => {
    expect(testState.playersAddedNumbers('room1')).toBe(false);
    testState.addUser('room1', player2)
    testState.setPlayerNumber('room1', player2, '98765')
    expect(testState.playersAddedNumbers('room1')).toBe(true);
  });

  it('initRoom should setup room2 with default state without obj pointer errors', () => {
    testState.initRoom('room2')
    expect(testState.roomData['room2'].players).toStrictEqual({});
  });

  it('initRoom should add a user to room2 without obj pointer errors', () => {
    testState.addUser('room2', player1)
    expect(testState.roomData['room2'].players['1']).toStrictEqual({ guesses: [], number: "", user: player1});
  });

  it('deleteRoom should delete room2', () => {
    expect(testState.roomData['room2']).not.toBe(undefined);
    testState.deleteRoom('room2')
    expect(testState.roomData['room2']).toBe(undefined);
  });
});
