import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import styled from '@emotion/native';

import { SafeAreaView } from 'components';

export const Header: FC = () => {
  return (
    <Wrapper>
      <SafeAreaView noStretch edges={['top']}>
        <StatusBar barStyle="light-content" />
        <Title>NYT News Feed</Title>
      </SafeAreaView>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  padding: 16px;
  background-color: ${props => props.theme.colors.headerBackground};
`;

const Title = styled.Text`
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.headerText};
`;
