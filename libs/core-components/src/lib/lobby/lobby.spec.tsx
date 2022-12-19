import { render } from '@testing-library/react';

import Lobby from './lobby';

describe('Lobby', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Lobby userName='user'/>);
    expect(baseElement).toBeTruthy();
  });
});
