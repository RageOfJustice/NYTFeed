import React, { FC, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import styled, { css } from '@emotion/native';
import _ from 'lodash';

import { Button, Divider } from 'components';
import { NEWS_SECTIONS, NewsSection } from '../constants';

interface Props {
  title: string;
}

export const Section: FC<Props> = ({ title }) => {
  const [selectedSection, setSelectedSection] = useState<NewsSection>('arts');

  const splitSections = useMemo(() => {
    const columns = 2;
    return _.chunk(NEWS_SECTIONS, columns);
  }, []);

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
            <Button
              selected={item[0] === selectedSection}
              title={item[0]}
              onPress={() => setSelectedSection(item[0])}
            />
            <Divider height={8} />
            {item[1] && (
              <Button
                selected={item[1] === selectedSection}
                title={item[1]}
                onPress={() => setSelectedSection(item[1])}
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
