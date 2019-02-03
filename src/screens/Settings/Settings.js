import React from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { StateContext } from '../../store/StateProvider';

export const Settings = () => {
  return (
    <StateContext.Consumer>
      {({ settingsVisible, theme, styles, _showSettings }) => (
        <Modal animationType='slide' visible={settingsVisible}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: theme.primaryColor
              }
            ]}
          >
            <TouchableOpacity
              style={{ alignItems: 'center', opacity: 0.5 }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => {
                _showSettings();
              }}
            >
              <Ionicons
                size={35}
                name='ios-arrow-down'
                color={theme.secondaryColorTxt}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: theme.secondaryColorTxt,
                alignSelf: 'center'
              }}
            >
              НАСТРОЙКИ КАЛЬКУЛЯТОРА
            </Text>
          </View>
        </Modal>
      )}
    </StateContext.Consumer>
  );
};
