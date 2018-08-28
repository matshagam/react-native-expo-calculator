import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export const HistoryView = ({ onClear, data }) => {
  let bEmpty = false;
  if (data.length === 0) {
    bEmpty = true;
  }

  return (
    <View style={styles.container}>
      <View style={styles.clearCont}>
        <TouchableOpacity transparent onPress={() => onClear()}>
          <Text style={styles.buttonEmptyHistoryText}>УДАЛИТЬ ИСТОРИЮ</Text>
        </TouchableOpacity>
      </View>
      {!bEmpty ? (
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={() => {
            this.scrollView.scrollToEnd({ animated: true });
          }}
        >
          {data.map((history, index) => (
            <View key={index} style={styles.historyCont}>
              <View style={styles.placeHolderHistory}>
                <View style={styles.expressionCont}>
                  <Text style={styles.txtExpression}>{history[0]}</Text>
                </View>
                <View style={styles.resultCont}>
                  <Text style={styles.txtResult}>{'= ' + history[1]}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyHistoryCont}>
          <Text style={styles.txtEmptyHistory}>Нет истории вычислений</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  clearCont: {
    height: 30,
    alignItems: 'flex-start',
    paddingLeft: 15,
    justifyContent: 'center'
  },
  txtExpression: {
    color: '#000',
    fontFamily: 'Helvetica-Light',
    fontSize: 13
  },
  txtResult: {
    color: '#27ae60',
    fontFamily: 'Helvetica-Light',
    fontSize: 13
  },
  historyCont: {
    flex: 1,
    flexDirection: 'column'
  },
  placeHolderHistory: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  expressionCont: {
    flex: 0.7,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  resultCont: {
    flex: 0.3,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  emptyHistoryCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtEmptyHistory: {
    color: '#7f8c8d',
    fontFamily: 'Helvetica-Light',
    fontSize: 15
  },
  buttonEmptyHistoryText: {
    color: '#7f8c8d',
    fontFamily: 'Helvetica-Light',
    fontSize: 11
  }
});
