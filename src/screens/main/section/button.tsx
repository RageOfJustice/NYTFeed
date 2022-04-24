import React, { FC } from 'react';
import { useAtomValue } from 'jotai';

import { Button } from 'components';
import { NewsSection } from 'api/top-stories';
import { selectedSectionAtom } from '../atoms';

interface Props {
  section: NewsSection;
  onPress?: (section: NewsSection) => void;
}

export const SectionButton: FC<Props> = ({ section, onPress }) => {
  const selectedSection = useAtomValue(selectedSectionAtom);
  return (
    <Button
      selected={section === selectedSection}
      title={section}
      onPress={() => onPress?.(section)}
    />
  );
};
