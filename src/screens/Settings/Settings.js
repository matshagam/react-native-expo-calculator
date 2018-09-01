import React from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  Picker,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { StateContext } from '../../store/StateProvider';

export const Settings = () => {
  return (
    <StateContext.Consumer>
      {({
        _showSettings,
        _changeThemeColor,
        settingsVisible,
        themeColor,
        theme,
        styles
      }) => (
        <Modal
          animationType="slide"
          transparent={false}
          visible={settingsVisible}
        >
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: theme.primaryColor
              }
            ]}
          >
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => {
                _showSettings();
              }}
            >
              <Ionicons
                name="md-close"
                size={32}
                color={theme.secondaryColorTxt}
                style={{ alignSelf: 'center' }}
              />
            </TouchableOpacity>
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
          </View>
        </Modal>
      )}
    </StateContext.Consumer>
  );
};

// const styles = StyleSheet.create({
//   modalView: {
//     paddingTop: 22,
//     height: '100%'
//   },
//   pickerView: {
//     height: 115,
//     width: '100%',
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   pickerLabel: {
//     paddingLeft: 15,
//     fontSize: 22
//   },
//   pickerRound: {
//     height: 130,
//     width: 130,
//     backgroundColor: '#fff',
//     right: 15,
//     alignItems: 'center',
//     borderRadius: 100
//   },
//   picker: {
//     height: 50,
//     width: 100,
//     bottom: 43
//   }
// });
