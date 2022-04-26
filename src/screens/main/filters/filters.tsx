import React, { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { uniq } from 'lodash';
import styled from '@emotion/native';

import { Button } from './button';
import { Divider } from 'components';
import { articlesBySectionAtom } from '../atoms';

interface Props {}

export const Filters: FC<Props> = props => {
  const articles = useAtomValue(articlesBySectionAtom);
  const locations = useMemo(
    () =>
      uniq(
        articles.reduce<string[]>((acc, article) => {
          acc.push(...article.geo_facet);
          return acc;
        }, [])
      ),
    [articles]
  );
  const locationsFilter = useFilter(locations);

  const descriptions = useMemo(
    () =>
      uniq(
        articles.reduce<string[]>((acc, article) => {
          acc.push(...article.des_facet);
          return acc;
        }, [])
      ),
    [articles]
  );
  const descriptionsFilter = useFilter(descriptions);

  return (
    <Wrapper>
      <Button
        items={locations}
        selectedItems={locationsFilter.selectedItems}
        onConfirm={locationsFilter.toggleItems}
        title="Location"
      />
      <Divider width={16} />
      <Button
        items={descriptions}
        selectedItems={descriptionsFilter.selectedItems}
        onConfirm={descriptionsFilter.toggleItems}
        title="Keywords"
      />
    </Wrapper>
  );
};

const useFilter = <Item extends string>(items: Item[]) => {
  const [selectedItems, setSelectedItems] = useState<Record<Item, boolean>>(
    {} as Record<Item, boolean>
  );
  useEffect(() => {
    setSelectedItems({} as Record<Item, boolean>);
  }, [items]);

  const toggleItems = useCallback((items: Record<Item, boolean>) => {
    setSelectedItems(state => ({ ...state, ...items }));
  }, []);

  const deselectAllItems = useCallback(() => {
    setSelectedItems({} as Record<Item, boolean>);
  }, []);

  return { selectedItems, toggleItems, deselectAllItems } as const;
};

const Wrapper = styled.View`
  flex-direction: row;
  padding: 16px;
  background-color: ${props => props.theme.colors.filtersBackground};
`;
