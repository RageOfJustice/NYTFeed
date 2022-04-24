import React, { FC } from 'react';
import styled from '@emotion/native';

import { Header } from './header';
import { Section } from './section';
import { Articles } from './articles';

export const MainScreen: FC = () => {
  return (
    <Wrapper>
      <Header />
      <Section />
      <Articles />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
`;
