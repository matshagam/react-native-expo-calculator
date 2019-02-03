import React from 'react';
import { Modal, View, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { StateContext } from '../../store/StateProvider';

export const Settings = () => {
  return (
    <StateContext.Consumer>
      {({
        settingsVisible,
        theme,
        styles,
        saveHistory,
        _showSettings,
        _saveData
      }) => (
        <Modal animationType='slide' visible={settingsVisible}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: theme.primaryColor
              }
            ]}
          >
            <View
              style={{
                flex: 1,
                marginTop: 50
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: 40,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    color: theme.secondaryColorTxt
                  }}
                >
                  {saveHistory
                    ? 'История сохраняется'
                    : 'История не сохраняется'}
                </Text>
                <TouchableOpacity
                  style={{ opacity: 0.5, width: 23, alignItems: 'center' }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => {
                    _saveData();
                  }}
                >
                  <Ionicons
                    size={23}
                    name={saveHistory ? 'ios-cloud' : 'ios-cloud-outline'}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 40,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    color: theme.secondaryColorTxt
                  }}
                >
                  Очиститить данные
                </Text>
                <TouchableOpacity
                  style={{ opacity: 0.5, width: 23, alignItems: 'center' }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons size={23} name={saveHistory ? 'ios-trash' : null} />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                color: theme.secondaryColorTxt,
                alignSelf: 'center'
              }}
            >
              НАСТРОЙКИ КАЛЬКУЛЯТОРА
            </Text>
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
          </View>
        </Modal>
      )}
    </StateContext.Consumer>
  );
};
