import React from 'react';
import { Text, View } from 'react-native';

export const FirstOutput = ({
  _firstSymbolOutput,
  _firstNumberOutput,
  placeHolderOutput,
  txtDefault
}) => {
  return (
    <View style={placeHolderOutput}>
      <Text style={txtDefault}>{_firstSymbolOutput}</Text>
      <Text style={txtDefault}>{_firstNumberOutput}</Text>
    </View>
  );
};
