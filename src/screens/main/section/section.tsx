import React, { FC, useMemo } from 'react';
import { FlatList } from 'react-native';
import styled, { css } from '@emotion/native';
import { useSetAtom } from 'jotai';
import _ from 'lodash';

import { Divider } from 'components';
import {
  NEWS_SECTIONS,
  NewsSection,
  getArticlesBySection,
} from 'api/top-stories';
import { selectedSectionAtom, allArticlesAtom } from '../atoms';
import { SectionButton } from './button';

interface Props {
  title: string;
}

export const Section: FC<Props> = ({ title }) => {
  const setSelectedSection = useSetAtom(selectedSectionAtom);
  const setArticles = useSetAtom(allArticlesAtom);

  const splitSections = useMemo(() => {
    const columns = 2;
    return _.chunk(NEWS_SECTIONS, columns);
  }, []);

  const handlePressSection = async (section: NewsSection) => {
    setSelectedSection(section);
    const articlesBySection = await getArticlesBySection(section);
    setArticles({ section, articles: articlesBySection });
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <FlatList
        horizontal
        contentContainerStyle={containerStyle}
        style={listStyle}
        showsHorizontalScrollIndicator={false}
        data={splitSections}
        keyExtractor={pair => pair[0]}
        ItemSeparatorComponent={() => <Divider width={16} />}
        renderItem={({ item }) => (
          <ItemWrapper>
            <SectionButton onPress={handlePressSection} section={item[0]} />
            <Divider height={8} />
            {item[1] && (
              <SectionButton onPress={handlePressSection} section={item[1]} />
            )}
          </ItemWrapper>
        )}
      />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.titleText};
`;

const listStyle = css`
  margin: 8px -16px 0;
`;

const containerStyle = css`
  padding: 0 16px;
`;

const ItemWrapper = styled.View`
  width: 100px;
  flex-direction: column;
`;
