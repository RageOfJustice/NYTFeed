import React, { FC, useEffect, useState } from 'react';
import { FlatList, Linking } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled, { css } from '@emotion/native';
import { useTheme } from '@emotion/react';

import { Article } from 'api/types';
import { NewsSection, getArticlesBySection } from 'api/top-stories';
import { Item } from './item';
import { Divider } from 'components';

interface Props {
  section: NewsSection;
}

export const Articles: FC<Props> = ({ section }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    getArticlesBySection(section).then(setArticles);
  }, [section]);

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
  padding: 16px 16px ${getBottomSpace().toString()}px;
`;

const listStyle = css`
  flex: 1;
  background-color: #cecece;
`;
