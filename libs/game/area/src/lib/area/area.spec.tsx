import { render } from '@testing-library/react';

import Area from './area';

describe('Area', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Area />);
    expect(baseElement).toBeTruthy();
  });
});
