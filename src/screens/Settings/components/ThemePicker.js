import React from 'react';
import { Text, View, Picker } from 'react-native';

import { StateContext } from '../../../store/StateProvider';

export const ThemePicker = () => {
  return (
    <StateContext.Consumer>
      {({ _changeThemeColor, themeColor, theme, styles }) => (
        <View style={styles.pickerView}>
          <Text
            style={[
              styles.pickerLabel,
              {
                color: theme.primaryColorTxt
              }
            ]}
          >
            Current theme:
          </Text>
          <View style={styles.pickerRound}>
            <Picker
              selectedValue={themeColor}
              style={styles.picker}
              onValueChange={color => _changeThemeColor(color)}
            >
              <Picker.Item label="Light" value="light" />
              <Picker.Item label="Dark" value="dark" />
            </Picker>
          </View>
        </View>
      )}
    </StateContext.Consumer>
  );
};
