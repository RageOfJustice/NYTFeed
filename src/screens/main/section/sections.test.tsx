import React from 'react';
import { render } from 'configs/test-utils';
import { Section } from './section';

describe('Section', () => {
  it('should render title', () => {
    const wrapper = render(<Section title="Test" />);
    wrapper.getByText('Test');
  });
});
