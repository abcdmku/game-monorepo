import styles from './game-number-game.module.css';

/* eslint-disable-next-line */
export interface GameNumberGameProps {}

export function GameNumberGame(props: GameNumberGameProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to GameNumberGame!</h1>
    </div>
  );
}

export default GameNumberGame;
