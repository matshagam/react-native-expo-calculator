import React from 'react';
import { Text, View } from 'react-native';

export const SecondOutput = ({
  _secondSymbolOutput,
  _secondNumberOutput,
  placeHolderOutput,
  txtDefault,
  themeColor,
  theme
}) => {
  return (
    <View
      style={[
        placeHolderOutput,
        { backgroundColor: themeColor === 'dark' ? '#000' : '#dedede' }
      ]}
    >
      <Text style={[txtDefault, { color: theme.primaryColorTxt }]}>
        {_secondSymbolOutput}
      </Text>
      <Text style={[txtDefault, { color: theme.primaryColorTxt }]}>
        {_secondNumberOutput}
      </Text>
    </View>
  );
};
