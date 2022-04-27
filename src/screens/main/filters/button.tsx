import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Modal from 'react-native-modal';
import styled from '@emotion/native';

import { ChevronDown } from 'assets/icons';
import { Divider } from 'components';

interface Props {
  title: string;
  items: string[];
  selectedItems: Record<string, boolean>;
  onConfirm: (items: Record<string, boolean>) => void;
}

export const Button: FC<Props> = ({
  title,
  items,
  selectedItems,
  onConfirm,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [locallySelectedItems, setLocallySelectedItems] =
    useState<Record<string, boolean>>(selectedItems);

  useEffect(() => {
    setLocallySelectedItems(selectedItems);
  }, [selectedItems]);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <Wrapper onPress={() => setModalVisible(true)}>
        <Text>{title}</Text>
        <Icon source={ChevronDown} />
      </Wrapper>
      <Modal
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        isVisible={modalVisible}>
        <ModalWrapper>
          <ModalHeader>
            <ModalTitle>Filter by {title}</ModalTitle>
          </ModalHeader>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={items}
            renderItem={({ item }) => (
              <ModalItemWrapper
                onPress={() =>
                  setLocallySelectedItems(state => ({
                    ...state,
                    [item]: !state[item],
                  }))
                }>
                <ModalItemText selected={locallySelectedItems[item]}>
                  {item}
                </ModalItemText>
              </ModalItemWrapper>
            )}
          />
          <ModalFooter>
            <ModalButtonWrapper onPress={closeModal}>
              <ModalButtonText>Close</ModalButtonText>
            </ModalButtonWrapper>

            <Divider width={8} />

            <ModalButtonWrapper
              onPress={() => {
                onConfirm(locallySelectedItems);
                closeModal();
              }}
              primary>
              <ModalButtonText primary>Confirm</ModalButtonText>
            </ModalButtonWrapper>
          </ModalFooter>
        </ModalWrapper>
      </Modal>
    </>
  );
};

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 8px;
  background-color: ${props => props.theme.colors.buttonBackground};
  border-radius: 4px;
`;

const Text = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.text};
`;

const Icon = styled.Image`
  tint-color: ${props => props.theme.colors.text};
`;

const ModalWrapper = styled.View`
  border-radius: 8px;
  background-color: ${props => props.theme.colors.background};
  width: 80%;
  height: 50%;
  align-self: center;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  padding: 16px;
`;

const ModalTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: ${props => props.theme.colors.titleText};
`;

const ModalItemWrapper = styled.TouchableOpacity`
  padding: 6px 16px;
`;

const ModalItemText = styled.Text<{ selected?: boolean }>`
  font-size: 14px;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.buttonSelected : theme.colors.text};
`;

const ModalFooter = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 16px;
`;

const ModalButtonWrapper = styled.TouchableOpacity<{ primary?: boolean }>`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${({ theme, primary }) =>
    primary
      ? theme.colors.modalButtonBackgroundPrimary
      : theme.colors.modalButtonBackgroundDefault};
`;

const ModalButtonText = styled.Text<{ primary?: boolean }>`
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  text-transform: capitalize;
  color: ${({ primary, theme }) =>
    primary
      ? theme.colors.modalButtonTextPrimary
      : theme.colors.modalButtonTextDefault};
`;
