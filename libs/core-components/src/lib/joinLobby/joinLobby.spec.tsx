import { render } from '@testing-library/react';

import {JoinLobby} from './joinLobby';

describe('JoinLobby', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<JoinLobby onSubmit={() => {}} />);
    expect(baseElement).toBeTruthy();
  });
});
