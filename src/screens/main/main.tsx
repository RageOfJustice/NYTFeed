import React, { FC } from 'react';
import styled from '@emotion/native';

import { Header } from './header';
import { Section } from './section';
import { Articles } from './articles';

export const MainScreen: FC = () => {
  return (
    <Wrapper>
      <Header />
      <Section title="Sections" />
      <Articles section="arts" />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
`;
