import React from 'react';

import { Modal, Text, View, TouchableOpacity } from 'react-native';

export const Settings = ({ visible, _showSettings }) => {
  return (
    <View style={{ marginTop: 22 }}>
      <Modal animationType="slide" transparent={false} visible={visible}>
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>Hello World!</Text>

            <TouchableOpacity
              onPress={() => {
                _showSettings();
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
