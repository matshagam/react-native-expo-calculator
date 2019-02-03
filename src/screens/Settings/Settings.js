import React from 'react';
import { Modal, View } from 'react-native';

import { ShowSettings } from './components/ShowSettings';
import { StateContext } from '../../store/StateProvider';

export const Settings = () => {
  return (
    <StateContext.Consumer>
      {({ settingsVisible, theme, styles }) => (
        <Modal animationType='slide' visible={settingsVisible}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: theme.primaryColor
              }
            ]}
          >
            <ShowSettings />
          </View>
        </Modal>
      )}
    </StateContext.Consumer>
  );
};
