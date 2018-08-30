import React from 'react';
import { Text, View } from 'react-native';

export const SecondOutput = ({
  _secondSymbolOutput,
  _secondNumberOutput,
  placeHolderOutput,
  txtDefault
}) => {
  return (
    <View style={placeHolderOutput}>
      <Text style={txtDefault}>{_secondSymbolOutput}</Text>
      <Text style={txtDefault}>{_secondNumberOutput}</Text>
    </View>
  );
};
