import { render } from '@testing-library/react';

import GameIcon from './game-icon';

describe('GameIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameIcon />);
    expect(baseElement).toBeTruthy();
  });
});
