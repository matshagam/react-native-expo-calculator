import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Message } from './components/Message';

import { StateContext } from '../../store/StateProvider';

export const HistoryView = () => {
  return (
    <StateContext.Consumer>
      {({ onClear, _history, _showSettings, theme, styles }) => (
        <View
          style={[
            styles.contHistory,
            { backgroundColor: theme.primaryColor, height: '100%' }
          ]}
        >
          <View
            style={[
              styles.containerHistory,
              { backgroundColor: theme.primaryColor }
            ]}
          >
            <View
              style={[
                styles.clearCont,
                { backgroundColor: theme.primaryColor }
              ]}
            >
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => {
                  _showSettings();
                }}
              >
                <Ionicons
                  name="ios-settings-outline"
                  size={23}
                  color={theme.secondaryColorTxt}
                />
              </TouchableOpacity>
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                transparent
                onPress={() => onClear()}
              >
                <Text
                  style={[
                    styles.buttonEmptyHistoryText,
                    { color: theme.secondaryColorTxt }
                  ]}
                >
                  {_history.length !== 0 ? 'УДАЛИТЬ ИСТОРИЮ' : null}
                </Text>
              </TouchableOpacity>
            </View>
            {_history.length !== 0 ? (
              <ScrollView
                style={{
                  marginTop: 25
                }}
                ref={ref => (this.scrollView = ref)}
                onContentSizeChange={() => {
                  this.scrollView.scrollToEnd({ animated: true });
                }}
              >
                {_history.map((history, index) => (
                  <View key={index} style={styles.historyCont}>
                    <View style={styles.expressionCont}>
                      <Text
                        style={[
                          styles.txtExpression,
                          { color: theme.primaryColorTxt }
                        ]}
                      >
                        {history[0]}
                      </Text>
                    </View>
                    <View style={styles.resultCont}>
                      <Text style={styles.txtResult}>{'= ' + history[1]}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.emptyHistoryCont}>
                <Text
                  style={[
                    styles.txtEmptyHistory,
                    { color: theme.secondaryColorTxt }
                  ]}
                >
                  Нет истории вычислений
                </Text>
              </View>
            )}
          </View>
          <Message />
        </View>
      )}
    </StateContext.Consumer>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   clearCont: {
//     height: 30,
//     width: width,
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     position: 'absolute',
//     zIndex: 1
//   },
//   txtExpression: {
//     fontFamily: 'Helvetica-Light',
//     fontSize: 13
//   },
//   txtResult: {
//     color: '#27ae60',
//     fontFamily: 'Helvetica-Light',
//     fontSize: 13
//   },
//   historyCont: {
//     flex: 1,
//     flexDirection: 'column',
//     marginLeft: 15,
//     marginRight: 15,
//     paddingTop: 0,
//     paddingBottom: 0,
//     backgroundColor: 'transparent'
//   },
//   expressionCont: {
//     flex: 0.7,
//     paddingTop: 5,
//     paddingBottom: 5,
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     backgroundColor: 'transparent'
//   },
//   resultCont: {
//     flex: 0.3,
//     paddingTop: 5,
//     paddingBottom: 5,
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     backgroundColor: 'transparent'
//   },
//   emptyHistoryCont: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   txtEmptyHistory: {
//     fontFamily: 'Helvetica-Light',
//     fontSize: 15
//   },
//   buttonEmptyHistoryText: {
//     fontFamily: 'Helvetica-Light',
//     fontSize: 11
//   }
// });
