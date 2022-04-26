import React, { FC } from 'react';
import { formatDistanceToNow } from 'date-fns';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styled from '@emotion/native';

import { Article } from 'api/types';
import { Image } from 'components';

interface Props {
  item: Article;
  onPress?: (item: Article) => void;
}

export const Item: FC<Props> & { Skeleton: React.FC } = ({ item, onPress }) => {
  return (
    <Wrapper onPress={() => onPress?.(item)}>
      <Cover source={{ uri: item.multimedia?.[0].url }} />
      <RightColumn>
        <Title numberOfLines={2}>{item.title}</Title>
        <Text numberOfLines={1}>{item.byline}</Text>
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

const Skeleton: FC = () => {
  return (
    <Wrapper style={{ flexDirection: 'column' }}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row">
          <SkeletonPlaceholder.Item width={90} height={90} marginRight={16} />
          <SkeletonPlaceholder.Item flex={1}>
            <SkeletonPlaceholder.Item width="100%" height={16} />
            <SkeletonPlaceholder.Item
              width="40%"
              height={16}
              marginTop={4}
              marginBottom={16}
            />
            <SkeletonPlaceholder.Item
              width="40%"
              height={12}
              marginBottom={4}
            />
            <SkeletonPlaceholder.Item width={50} height={12} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Wrapper>
  );
};

Item.Skeleton = Skeleton;

const Wrapper = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 4px;
  flex-direction: row;
  background-color: ${props => props.theme.colors.cardBackground};
`;

const Cover = styled(Image)`
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
