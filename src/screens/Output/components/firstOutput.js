import React from 'react';
import { Text, View } from 'react-native';
import { StateContext } from '../../../store/StateProvider';

export const FirstOutput = () => {
  return (
    <StateContext.Consumer>
      {({
        _firstSymbolOutput,
        _firstNumberOutput,
        styles,
        themeColor,
        theme
      }) => (
        <View
          style={[
            styles.placeHolderOutput,
            { backgroundColor: themeColor === 'dark' ? '#000' : '#dedede' }
          ]}
        >
          <Text
            style={[styles.txtDefaultOutput, { color: theme.primaryColorTxt }]}
          >
            {_firstSymbolOutput}
          </Text>
          <Text
            style={[styles.txtDefaultOutput, { color: theme.primaryColorTxt }]}
          >
            {_firstNumberOutput}
          </Text>
        </View>
      )}
    </StateContext.Consumer>
  );
};
