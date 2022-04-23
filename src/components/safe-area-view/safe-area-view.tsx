import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';

interface Props {
  noStretch?: boolean;
}

export const SafeAreaView = styled(RNSafeAreaView)<Props>`
  ${props => !props.noStretch && 'flex: 1;'}
`;
