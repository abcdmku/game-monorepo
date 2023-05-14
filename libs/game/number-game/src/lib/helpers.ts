import { User } from "@game-mr/helpers";

export const validGuess = (guess:string) => /^(\d)(?!.*\1)(\d)(?!.*\2)(\d)(?!.*\3)(\d)(?!.*\4)\d$/.test(guess)
export const dupeCheck = (guess: string, guesses: string[]) => guesses.some(g => g === guess)
export const numcheck = (number, guess) => {
  let p = 0, n = 0;
  for (let i = 0; i < 5; i++) guess.indexOf(number.charAt(i)) !== -1 && (guess.charAt(i) == number.charAt(i) ? p++ : n++)
  return {guess: guess, p: p, n: n };
}

export interface guess {
  guess: string;
  n: number;
  p: number;
}
  
export interface roomGuessProps {
  player: User;
  guess: guess;
}

export interface roomNumberProps {
  player: User;
  number: string;
}

export interface roomDataProps {
  player: { [x:number]:User }
  maxPlayers: number;
  guesses: roomGuessProps[];
  turn: User;
  numbers: roomNumberProps[]
  state: gameState;
}

export const roomInitState = {
  player: {},
  maxPlayers: 2,
  guesses: [] as roomGuessProps[],
  turn: {} as User,
  numbers: [] as roomNumberProps[],
  state: 0
} as roomDataProps

export enum gameState {
  open = 0,
  initalizing = 1,
  playing = 2,
  finished = 3
}

