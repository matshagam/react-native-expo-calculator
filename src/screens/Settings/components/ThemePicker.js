import React from 'react';
import { View, Picker } from 'react-native';

import { StateContext } from '../../../store/StateProvider';

export const ThemePicker = () => {
  return (
    <StateContext.Consumer>
      {({ _changeThemeColor, themeColor, theme, styles }) => (
        <View>
          <Picker
            selectedValue={themeColor}
            style={styles.picker}
            itemStyle={{
              color: theme.primaryColorTxt,
              height: 200
            }}
            onValueChange={color => _changeThemeColor(color)}
          >
            <Picker.Item label='Light' value='light' />
            <Picker.Item label='Dark' value='dark' />
          </Picker>
        </View>
      )}
    </StateContext.Consumer>
  );
};
