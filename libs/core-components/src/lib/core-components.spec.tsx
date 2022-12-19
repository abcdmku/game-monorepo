import { render } from '@testing-library/react';

import Lobby from './core-components';

describe('CoreComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoreComponents />);
    expect(baseElement).toBeTruthy();
  });
});
