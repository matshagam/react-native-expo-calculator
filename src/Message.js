import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Message = ({ visible, message }) => {
  return visible ? (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    flex: 1,
    bottom: 0,
    width: '100%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#000',
    fontFamily: 'Helvetica-Light',
    fontSize: 16
  }
});
