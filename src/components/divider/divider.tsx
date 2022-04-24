import styled from '@emotion/native';

export const Divider = styled.View<{ height?: number; width?: number }>`
  height: ${props => props.height?.toString() ?? '0'}px;
  width: ${props => props.width?.toString() ?? '0'}px;
`;
