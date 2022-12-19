import { render } from '@testing-library/react';

import GameNumberGame from './game-number-game';

describe('GameNumberGame', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameNumberGame />);
    expect(baseElement).toBeTruthy();
  });
});
