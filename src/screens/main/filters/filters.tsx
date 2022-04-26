import React, { FC } from 'react';
import styled from '@emotion/native';

import { Button } from './button';
import { Divider } from 'components';
import { useDescriptionsFilter, useLocationsFilter } from '../atoms';

export const Filters: FC = () => {
  const locationsFilter = useLocationsFilter();
  const descriptionsFilter = useDescriptionsFilter();

  return (
    <Wrapper>
      <Button
        items={locationsFilter.items}
        selectedItems={locationsFilter.selectedItems}
        onConfirm={locationsFilter.toggleItems}
        title="Location"
      />
      <Divider width={16} />
      <Button
        items={descriptionsFilter.items}
        selectedItems={descriptionsFilter.selectedItems}
        onConfirm={descriptionsFilter.toggleItems}
        title="Keywords"
      />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex-direction: row;
  padding: 16px;
  background-color: ${props => props.theme.colors.filtersBackground};
`;
