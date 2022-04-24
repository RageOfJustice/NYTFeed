import React, { FC } from 'react';
import FastImage from 'react-native-fast-image';
import { formatDistanceToNow } from 'date-fns';
import styled from '@emotion/native';

import { Article } from 'api/types';

interface Props {
  item: Article;
  onPress?: (item: Article) => void;
}

export const Item: FC<Props> = ({ item, onPress }) => {
  return (
    <Wrapper onPress={() => onPress?.(item)}>
      <Image source={{ uri: item.multimedia?.[0].url }} />
      <RightColumn>
        <Title numberOfLines={2}>{item.title}</Title>
        <Text>{item.byline}</Text>
        <Text>
          Published:{' '}
          {formatDistanceToNow(new Date(item.published_date), {
            addSuffix: true,
          })}
        </Text>
      </RightColumn>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 4px;
  flex-direction: row;
  background-color: ${props => props.theme.colors.cardBackground};
`;

const Image = styled(FastImage)`
  height: 90px;
  width: 90px;
  margin-right: 16px;
`;

const RightColumn = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${props => props.theme.colors.titleText};
`;

const Text = styled.Text`
  font-size: 12px;
  line-height: 18px;
  color: ${props => props.theme.colors.text};
`;
