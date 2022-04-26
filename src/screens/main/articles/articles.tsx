import React, { FC } from 'react';
import { FlatList, Linking } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useAtomValue } from 'jotai';
import { css } from '@emotion/native';
import { useTheme } from '@emotion/react';

import { Divider } from 'components';
import { Article } from 'api/types';
import { Item } from './item';
import { articlesBySectionAtom } from '../atoms';

export const Articles: FC = () => {
  const articles = useAtomValue(articlesBySectionAtom);
  const handlePressItem = (item: Article) => Linking.openURL(item.url);

  const theme = useTheme();
  const backgroundStyle = { backgroundColor: theme.colors.articlesBackground };
  return (
    <FlatList
      style={[listStyle, backgroundStyle]}
      contentContainerStyle={containerStyle}
      ItemSeparatorComponent={() => <Divider height={12} />}
      data={articles}
      renderItem={({ item }) => <Item item={item} onPress={handlePressItem} />}
    />
  );
};

const containerStyle = css`
  padding: 16px 16px ${(getBottomSpace() + 16).toString()}px;
`;

const listStyle = css`
  flex: 1;
  background-color: #cecece;
`;
