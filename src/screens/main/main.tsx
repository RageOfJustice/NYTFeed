import React, { FC } from 'react';
import styled from '@emotion/native';

import { Button, SafeAreaView } from 'components';
import { Header } from './header';

export const MainScreen: FC = () => {
  return (
    <SafeAreaView edges={['bottom']}>
      <Header />
      <Wrapper>
        <Button title="test" />
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.ScrollView`
  flex: 1;
`;
