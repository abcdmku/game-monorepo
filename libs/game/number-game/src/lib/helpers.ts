import { User } from "@game-mr/helpers";

export const randomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) -  Math.ceil(min) + 1)) + Math.ceil(min);
export const validGuess = (guess:string) => /^(\d)(?!.*\1)(\d)(?!.*\2)(\d)(?!.*\3)(\d)(?!.*\4)\d$/.test(guess)
export const dupeCheck = (guess: string, guesses: string[]) => guesses.some(g => g === guess)
export const numcheck = (number, guess) => {
  let p = 0, n = 0;
  for (let i = 0; i < 5; i++) guess.indexOf(number.charAt(i)) !== -1 && (guess.charAt(i) == number.charAt(i) ? p++ : n++)
  return {guess: guess, p: p, n: n };
}

export const playerNumber = (players: roomDataProps['players'], player: User) => Object.entries(players).findIndex(([_,v]) => v.user.id === player.id) + 1;

//  return v.User.id === player.id && k

export interface guess {
  guess: string;
  n: number;
  p: number;
}

export interface roomDataProps {
  players: { 
    [x:number]:{
      user: User,
      guesses: guess[];
      number: string;
    }
  }
  maxPlayers: number;
  turn: number;
  state: gameState;
}

export const roomInitState = {
  players: {},
  maxPlayers: 2,
  turn: randomInt(1,2),
  state: 0
} as roomDataProps;

export const playerInitState = {
  user: {} as User,
  guesses: [],
  number: ''
}

export enum gameState {
  open = 0,
  initalizing = 1,
  playing = 2,
  finished = 3
}

