import React from 'react';
import { Image, ImageStyle } from 'react-native';

interface NigelLogoProps {
  size?: number;
  style?: ImageStyle;
}

const nigelLogo = require('../../../assets/images/Nigel.png');

export function NigelLogo({ size = 32, style }: NigelLogoProps) {
  return (
    <Image
      source={nigelLogo}
      style={[{ width: size, height: size, resizeMode: 'contain' }, style]}
    />
  );
}

export function NigelLogoWhite({ size = 32, style }: NigelLogoProps) {
  return (
    <Image
      source={nigelLogo}
      style={[{ width: size, height: size, resizeMode: 'contain' }, style]}
    />
  );
}
