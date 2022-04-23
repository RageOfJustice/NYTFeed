import React, { FC } from 'react';
import styled from '@emotion/native';

import { SafeAreaView } from 'components';
import { Header } from './header';
import { Section } from './section';

export const MainScreen: FC = () => {
  return (
    <SafeAreaView edges={['bottom']}>
      <Header />
      <Wrapper>
        <Section title="Sections" />
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.ScrollView`
  flex: 1;
`;
