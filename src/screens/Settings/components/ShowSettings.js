import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { StateContext } from '../../../store/StateProvider';

export const ShowSettings = () => {
  return (
    <StateContext.Consumer>
      {({ _showSettings, theme, settingsVisible }) => (
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => {
            _showSettings();
          }}
        >
          <Ionicons
            name={!settingsVisible ? 'ios-settings' : 'md-close'}
            size={23}
            color={theme.secondaryColorTxt}
            style={settingsVisible ? { alignSelf: 'center' } : null}
          />
        </TouchableOpacity>
      )}
    </StateContext.Consumer>
  );
};
