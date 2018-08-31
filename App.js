import React, { Component } from 'react';
import { Clipboard, View, Platform, StyleSheet } from 'react-native';

import { NumberButtons } from './src/Numbers';
import { HistoryView } from './src/History';
import { Message } from './src/Message';
import { FirstOutput } from './src/firstOutput';
import { SecondOutput } from './src/secondOutput';
import { Settings } from './src/Settings';
import { buttons, initialOutput, maxLength, theme } from './src/initialState';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _firstSymbolOutput: '',
      _firstNumberOutput: initialOutput,
      _secondSymbolOutput: '',
      _secondNumberOutput: initialOutput,
      _history: [],
      messageVisible: false,
      settingsVisible: false,
      message: '',
      themeColor: 'light',
      theme: theme.light
    };
    this._clearHistory = this._clearHistory.bind(this);
    this._handleEvent = this._handleEvent.bind(this);
    this._showSettings = this._showSettings.bind(this);
  }

  _handleEvent = value => {
    const {
      _firstSymbolOutput,
      _secondSymbolOutput,
      _secondNumberOutput
    } = this.state;

    if (
      (!isNaN(value) && !_secondNumberOutput.includes('%')) ||
      (value === '.' && !_secondNumberOutput.includes(value)) ||
      (value === '%' && !_secondNumberOutput.includes(value))
    ) {
      this._concatToNumberOutput(value);
    } else {
      switch (value) {
        case buttons[1][3]:
        case buttons[2][3]:
        case buttons[3][3]:
        case buttons[4][3]:
          if (_firstSymbolOutput !== '=' || _secondSymbolOutput) {
            this._evaluate();
            this._concatToSymbolOutput(value);
          }
          break;

        case buttons[0][0]:
          this._setToClipboard();
          break;

        case buttons[0][1]:
          this._initOutput();
          break;

        case buttons[0][2]:
          if (_secondNumberOutput.length === 1) {
            this.setState({
              _secondNumberOutput: initialOutput
            });
          } else {
            this._replaceLastIndex('');
          }
          break;

        case buttons[4][2]:
          this._evaluate();
          this.setState({
            _firstSymbolOutput: value,
            _secondSymbolOutput: ''
          });
          break;
      }
    }
  };

  _concatToNumberOutput = value => {
    const { _secondNumberOutput } = this.state;
    if (_secondNumberOutput.length >= maxLength) {
      this._showMessage(`Превышен максимум в ${maxLength} цифр!`);
    } else {
      if (_secondNumberOutput !== initialOutput) {
        this.setState({
          _secondNumberOutput: _secondNumberOutput + '' + value + ''
        });
      } else {
        this.setState({ _secondNumberOutput: value + '' });
      }
    }
  };

  _concatToSymbolOutput = value => {
    const { _secondSymbolOutput } = this.state;
    if (_secondSymbolOutput) {
      this.setState({
        _secondSymbolOutput: value + '',
        _firstSymbolOutput: ''
      });
    } else {
      this.setState({
        _secondSymbolOutput: '' + value,
        _firstSymbolOutput: ''
      });
    }
  };

  _replaceLastIndex = value => {
    const { _secondNumberOutput } = this.state;
    let str1 = _secondNumberOutput.replace(/.$/, value);
    this.setState({
      _secondNumberOutput: str1
    });
  };

  _evaluate = () => {
    const {
      _firstNumberOutput,
      _secondNumberOutput,
      _secondSymbolOutput,
      _history
    } = this.state;

    let aHistory = [..._history];
    let includesX = _secondSymbolOutput.includes('x') ? true : false;
    let includesPercent = _secondNumberOutput.includes('%') ? true : false;
    let dEval;
    let tEval;

    try {
      if (_secondNumberOutput !== initialOutput) {
        if (includesPercent) {
          tEval =
            eval(
              _firstNumberOutput +
                _secondSymbolOutput.replace(/[+]|[-]|[x]/g, '*') +
                _secondNumberOutput.slice(0, -1)
            ) / 100;

          if (includesX) {
            aHistory.push([
              _firstNumberOutput + _secondSymbolOutput + _secondNumberOutput,
              tEval
            ]);
          } else {
            dEval = eval(_firstNumberOutput + _secondSymbolOutput + tEval);
            aHistory.push([
              _firstNumberOutput +
                _secondSymbolOutput +
                _secondNumberOutput +
                ' (' +
                tEval +
                ')',
              dEval
            ]);
          }

          this.setState({
            _firstNumberOutput: includesX ? tEval : dEval,
            _secondNumberOutput: initialOutput,
            _history: aHistory
          });
        } else {
          if (
            _firstNumberOutput !== initialOutput &&
            isNaN(_secondSymbolOutput)
          ) {
            dEval = eval(
              _firstNumberOutput +
                this._convertToMathExpression(_secondSymbolOutput) +
                _secondNumberOutput
            );

            aHistory.push([
              _firstNumberOutput + _secondSymbolOutput + _secondNumberOutput,
              dEval
            ]);

            this.setState({
              _firstNumberOutput: dEval,
              _secondNumberOutput: initialOutput,
              _history: aHistory
            });
          } else {
            this.setState({
              _firstNumberOutput: _secondNumberOutput,
              _secondNumberOutput: initialOutput
            });
          }
        }
      }
    } catch (exception) {
      this._showMessage(`${exception}`);
    }
  };

  _convertToMathExpression = value => {
    let strTemp = value.replace(
      new RegExp(this._escapeRegExp(buttons[1][3]), 'g'),
      '/'
    );
    strTemp = strTemp.replace(
      new RegExp(this._escapeRegExp(buttons[2][3]), 'g'),
      '*'
    );
    return strTemp;
  };

  _escapeRegExp = str => {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  };

  _initOutput = () => {
    this.setState({
      _firstSymbolOutput: '',
      _firstNumberOutput: initialOutput,
      _secondSymbolOutput: '',
      _secondNumberOutput: initialOutput
    });
  };

  _clearHistory = () => {
    this.setState({
      _history: []
    });
  };

  _setToClipboard = () => {
    const { _firstNumberOutput } = this.state;
    const clipboard = _firstNumberOutput.toString();
    Clipboard.setString(clipboard);
    this._showMessage(`Сохранено в буфер: ${clipboard}`);
  };

  _showMessage = message => {
    this.setState({ messageVisible: true, message: message }, () => {
      setTimeout(() => {
        this.setState({ messageVisible: false });
      }, 3000);
    });
  };

  _showSettings = () => {
    this.setState({
      settingsVisible: !this.state.settingsVisible
    });
  };

  _changeThemeColor = color => {
    this.setState({
      themeColor: color === 'light' ? 'light' : 'dark',
      theme: color === 'light' ? theme.light : theme.dark
    });
  };

  render() {
    const {
      _secondNumberOutput,
      _secondSymbolOutput,
      _firstNumberOutput,
      _firstSymbolOutput,
      _history,
      messageVisible,
      settingsVisible,
      message,
      themeColor,
      theme
    } = this.state;

    return (
      <View style={styles.container}>
        <Settings
          visible={settingsVisible}
          _showSettings={this._showSettings}
          themeColor={themeColor}
          _changeThemeColor={this._changeThemeColor}
          theme={theme}
        />
        <View style={styles.contHistory}>
          <HistoryView
            data={_history}
            onClear={this._clearHistory}
            _showSettings={this._showSettings}
            theme={theme}
          />
          <Message visible={messageVisible} message={message} />
        </View>
        <View style={styles.contOutput}>
          <FirstOutput
            placeHolderOutput={styles.placeHolderOutput}
            txtDefault={styles.txtDefault}
            _firstSymbolOutput={_firstSymbolOutput}
            _firstNumberOutput={_firstNumberOutput}
            theme={theme}
            themeColor={themeColor}
          />
          <SecondOutput
            placeHolderOutput={styles.placeHolderOutput}
            txtDefault={styles.txtDefault}
            _secondSymbolOutput={_secondSymbolOutput}
            _secondNumberOutput={_secondNumberOutput}
            theme={theme}
            themeColor={themeColor}
          />
        </View>
        <View
          style={[styles.contButtons, { backgroundColor: theme.primaryColor }]}
        >
          <NumberButtons
            onBtnPress={this._handleEvent}
            buttons={buttons}
            theme={theme}
            themeColor={themeColor}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        // marginTop: 20
      }
    }),
    flex: 1,
    flexDirection: 'column'
  },
  contHistory: {
    flex: 0.45
  },
  contOutput: {
    flex: 0.25
  },
  contButtons: {
    flex: 0.9
  },
  placeHolderOutput: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingHorizontal: 15
  },
  txtDefault: {
    fontFamily: 'Helvetica-Light',
    fontSize: 30,
    width: 'auto'
  }
});
