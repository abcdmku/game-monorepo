import { User } from "@game-mr/helpers";

export const validGuess = (guess:string) => /^(\d)(?!.*\1)(\d)(?!.*\2)(\d)(?!.*\3)(\d)(?!.*\4)\d$/.test(guess)
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
  players: User[];
  guesses: roomGuessProps[];
  turn: User;
  numbers: roomNumberProps[]
  state: gameState;
}

export const roomInitState = {
  players: [] as User[],
  guesses: [] as roomGuessProps[],
  turn: {} as User,
  numbers: [] as roomNumberProps[],
  state: 0
}

export enum gameState {
  open = 0,
  initalizing = 1,
  playing = 2,
  finished = 3
}

