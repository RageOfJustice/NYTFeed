import React, { FC, useMemo } from 'react';
import { FlatList } from 'react-native';
import { chunk } from 'lodash';
import styled, { css } from '@emotion/native';

import { Divider } from 'components';
import { NEWS_SECTIONS, NewsSection } from 'api/top-stories';
import { useSelectSection } from '../atoms';
import { SectionButton } from './button';

export const Section: FC = () => {
  const splitSections = useMemo(() => {
    const columns = 2;
    return chunk(NEWS_SECTIONS, columns);
  }, []);

  const [, setSelectedSection] = useSelectSection();

  const handlePressSection = async (section: NewsSection) => {
    await setSelectedSection(section);
  };

  return (
    <Wrapper>
      <Title>Sections</Title>
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
