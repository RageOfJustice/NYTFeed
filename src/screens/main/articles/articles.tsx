import React, { FC, useMemo } from 'react';
import { FlatList, Linking } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useAtomValue } from 'jotai';
import { isBefore, parseISO } from 'date-fns';
import { range } from 'lodash';
import { css } from '@emotion/native';
import { useTheme } from '@emotion/react';

import { Divider } from 'components';
import { Article } from 'api/types';
import { Item } from './item';
import {
  articlesBySectionAtom,
  isSelectedSectionLoadingAtom,
  useRefreshSectionArticles,
} from '../atoms';

const SKELETON_RANGE = range(0, 7);

export const Articles: FC = () => {
  const articles = useAtomValue(articlesBySectionAtom);
  const loading = useAtomValue(isSelectedSectionLoadingAtom);
  const handlePressItem = (item: Article) => Linking.openURL(item.url);

  const sortedArticles = useMemo(
    () =>
      articles.sort((a, b) =>
        isBefore(parseISO(a.published_date), parseISO(b.published_date))
          ? 1
          : -1
      ),
    [articles]
  );

  const theme = useTheme();
  const backgroundStyle = { backgroundColor: theme.colors.articlesBackground };

  const [refreshing, onRefresh] = useRefreshSectionArticles();

  if (loading && articles.length === 0) {
    return (
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={[listStyle, backgroundStyle]}
        contentContainerStyle={containerStyle}
        ItemSeparatorComponent={() => <Divider height={12} />}
        data={SKELETON_RANGE}
        renderItem={() => <Item.Skeleton />}
      />
    );
  }

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={[listStyle, backgroundStyle]}
      contentContainerStyle={containerStyle}
      ItemSeparatorComponent={() => <Divider height={12} />}
      data={sortedArticles}
      keyExtractor={item => item.uri}
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
