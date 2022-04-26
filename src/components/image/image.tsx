import React, { FC } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { DefaultImage } from 'assets/images';

interface Props extends FastImageProps {}

export const Image: FC<Props> = ({ source, ...rest }) => {
  let validSource = source;
  if (isSourceInvalid(source)) {
    validSource = DefaultImage;
  }
  return <FastImage source={validSource} {...rest} />;
};

const isSourceInvalid = (source: FastImageProps['source']) =>
  typeof source !== 'number' && !source.uri;
