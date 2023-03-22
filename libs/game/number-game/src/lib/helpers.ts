import { User } from "@game-mr/helpers";

export const validGuess = (guess:string) => /^(\d)(?!.*\1)(\d)(?!.*\2)(\d)(?!.*\3)(\d)(?!.*\4)\d$/.test(guess)

interface Guess {
    guess: string;
    n: number;
    p: number;
  }
  
interface playerDataProps {
    player: User;
    guesses: Guess[];
}

export interface roomDataProps {
    playerData: playerDataProps[];
    turn: User;
}