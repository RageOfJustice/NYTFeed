import React, { FC, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import styled, { css } from '@emotion/native';

import { Button } from 'components';

interface Props {
  title: string;
}

interface Item {
  id: string;
  title: string;
}

const mockSections: Item[] = [
  { id: '1', title: 'Arts' },
  { id: '2', title: 'World' },
  { id: '3', title: 'Science' },
  { id: '4', title: 'Sports' },
  { id: '5', title: 'Weather' },
  { id: '6', title: 'Opinion' },
];

export const Section: FC<Props> = ({ title }) => {
  const [selectedSectionId, setSelectedSection] = useState<Item['id']>();

  const sections = mockSections;

  const splitSections = useMemo(() => {
    const res = [];
    const columns = 2;
    for (let i = 0; i < sections.length; i += columns) {
      const chunk = sections.slice(i, i + columns);
      res.push(chunk);
    }
    return res;
  }, [sections]);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <FlatList
        horizontal
        contentContainerStyle={containerStyle}
        style={listStyle}
        showsHorizontalScrollIndicator={false}
        data={splitSections}
        ItemSeparatorComponent={() => <Divider width={16} />}
        renderItem={({ item }) => (
          <ItemWrapper>
            <Button
              selected={item[0].id === selectedSectionId}
              title={item[0].title}
              onPress={() => setSelectedSection(item[0].id)}
            />
            <Divider height={8} />
            {item[1] && (
              <Button
                selected={item[1].id === selectedSectionId}
                title={item[1].title}
                onPress={() => setSelectedSection(item[1].id)}
              />
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
  color: ${props => props.theme.colors.text};
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

const Divider = styled.View<{ height?: number; width?: number }>`
  height: ${props => props.height?.toString() ?? '0'}px;
  width: ${props => props.width?.toString() ?? '0'}px;
`;
