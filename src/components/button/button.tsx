import React, { FC } from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from '@emotion/native';

interface Selectable {
  selected?: boolean;
}

interface Props extends TouchableOpacityProps, Selectable {
  title: string;
}

export const Button: FC<Props> = ({ title, selected, ...rest }) => {
  return (
    <Wrapper accessibilityRole="button" {...rest} selected={selected}>
      <Text selected={selected}>{title}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity<Selectable>`
  padding: 6px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ selected, theme }) =>
    selected ? theme.colors.buttonSelected : theme.colors.text};
`;

const Text = styled.Text<Selectable>`
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.buttonSelected : theme.colors.text};
`;
