import React from 'react';
import { Text, View } from 'react-native';

export const FirstOutput = ({
  _firstSymbolOutput,
  _firstNumberOutput,
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
        {_firstSymbolOutput}
      </Text>
      <Text style={[txtDefault, { color: theme.primaryColorTxt }]}>
        {_firstNumberOutput}
      </Text>
    </View>
  );
};
