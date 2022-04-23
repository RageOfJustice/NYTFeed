import React, { FC } from 'react';
import styled from '@emotion/native';

import { Button, SafeAreaView } from 'components';

interface Props {}

export const MainScreen: FC<Props> = props => {
  return (
    <SafeAreaView>
      <Wrapper>
        <Button title="test"></Button>
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.ScrollView`
  flex: 1;
`;
