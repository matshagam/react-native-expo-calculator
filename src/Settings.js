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

export const Settings = ({
  visible,
  _showSettings,
  themeColor,
  _changeThemeColor
}) => {
  return (
    <View style={{ marginTop: 22 }}>
      <Modal animationType="slide" transparent={false} visible={visible}>
        <View style={{ marginTop: 22 }}>
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={() => {
              _showSettings();
            }}
          >
            <Ionicons
              name="md-close"
              size={32}
              color="#7f8c8d"
              style={{ alignSelf: 'center' }}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.pickerLabel}>Current theme:</Text>
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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: 100,
    right: 15,
    top: -50,
    position: 'absolute'
  },
  pickerLabel: {
    left: 15,
    top: 44,
    fontSize: 22
  }
});
