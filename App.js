import React, { Component } from "react";
import { Clipboard, View, Text, Platform, StyleSheet } from "react-native";

import NumberButtons from "./src/Numbers";
import HistoryView from "./src/History";
import Message from "./src/Message";

const buttons = [
  ["СОХР", "ОЧИС", "УДАЛ", "%"],
  ["7", "8", "9", " ÷ "],
  ["4", "5", "6", " x "],
  ["1", "2", "3", " + "],
  [".", "0", " = ", " - "]
];

const initialOutput = "0";
const maxLength = 17;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _symbolOutput: "",
      _numberOutput: initialOutput,
      _resultSymbolOutput: "",
      _resultNumberOutput: initialOutput,
      _history: [],
      messageVisible: false
    };
    this._clearHistory = this._clearHistory.bind(this);
    this._handleEvent = this._handleEvent.bind(this);
  }

  _handleEvent = value => {
    if (!isNaN(value) || value == "." || value == "%") {
      this._concatToNumberOutput(value);
    } else {
      switch (value) {
        case buttons[1][3]:
        case buttons[2][3]:
        case buttons[3][3]:
        case buttons[4][3]:
          if (
            this.state._resultSymbolOutput !== "=" ||
            this.state._symbolOutput
          ) {
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
          if (this.state._numberOutput.length === 1) {
            this.setState({
              _numberOutput: initialOutput
            });
          } else {
            this._replaceLastIndex("");
          }
          break;

        case buttons[4][2]:
          this._evaluate();
          this.setState({
            _resultSymbolOutput: value,
            _symbolOutput: ""
          });
          break;
      }
    }
  };

  _concatToNumberOutput = value => {
    if (this.state._numberOutput.length >= maxLength) {
      this._showMessage(`Превышен максимум в ${maxLength} цифр!`);
    } else {
      if (this.state._numberOutput !== initialOutput) {
        this.setState({
          _numberOutput: this.state._numberOutput + "" + value + ""
        });
      } else {
        this.setState({ _numberOutput: value + "" });
      }
    }
  };

  _concatToSymbolOutput = value => {
    if (this.state._symbolOutput) {
      this.setState({
        _symbolOutput: value + "",
        _resultSymbolOutput: ""
      });
    } else {
      this.setState({
        _symbolOutput: "" + value,
        _resultSymbolOutput: ""
      });
    }
  };

  _replaceLastIndex = value => {
    let str1 = this.state._numberOutput.replace(/.$/, value);
    this.setState({
      _numberOutput: str1
    });
  };

  _evaluate = () => {
    const { _numberOutput, _symbolOutput, _resultNumberOutput } = this.state;
    try {
      let aHistory = [...this.state._history];
      let dEval;
      let tEval;
      if (_numberOutput !== initialOutput) {
        if (_numberOutput.includes("%")) {
          tEval =
            eval(
              _resultNumberOutput +
                this._escapeRegExp(_symbolOutput) +
                _numberOutput.slice(0, -1)
            ) / 100;
          dEval = eval(_resultNumberOutput + _symbolOutput + tEval);

          aHistory.push([
            _resultNumberOutput +
              _symbolOutput +
              _numberOutput +
              " (" +
              tEval +
              ")",
            dEval
          ]);

          this.setState({
            _resultNumberOutput: dEval,
            _numberOutput: initialOutput,
            _history: aHistory
          });
        } else {
          if (_resultNumberOutput !== initialOutput && isNaN(_symbolOutput)) {
            dEval = eval(
              _resultNumberOutput +
                this._convertToMathExpression(_symbolOutput) +
                _numberOutput
            );

            aHistory.push([
              _resultNumberOutput + _symbolOutput + _numberOutput,
              dEval
            ]);

            this.setState({
              _resultNumberOutput: dEval,
              _numberOutput: initialOutput,
              _history: aHistory
            });
          } else {
            this.setState({
              _resultNumberOutput: _numberOutput,
              _numberOutput: initialOutput
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
      new RegExp(this._escapeRegExp(buttons[1][3]), "g"),
      "/"
    );
    strTemp = strTemp.replace(
      new RegExp(this._escapeRegExp(buttons[2][3]), "g"),
      "*"
    );
    return strTemp;
  };

  _escapeRegExp = str => {
    if (this.state._numberOutput.includes("%")) {
      return str.replace(/[+]|[-]/g, "*");
    } else {
      return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
  };

  _initOutput = () => {
    this.setState({
      _symbolOutput: "",
      _numberOutput: initialOutput,
      _resultSymbolOutput: "",
      _resultNumberOutput: initialOutput
    });
  };

  _clearHistory = () => {
    const emptyArray = [];
    this.setState({
      _history: emptyArray
    });
  };

  _setToClipboard = () => {
    const clipboard = this.state._resultNumberOutput.toString();
    Clipboard.setString(clipboard);
    this._showMessage(`Сохранено в буфер: ${clipboard}`);
  };

  _showMessage = message => {
    this.setState(
      { messageVisible: !this.state.messageVisible, message: message },
      () => {
        setTimeout(() => {
          this.setState({ messageVisible: !this.state.messageVisible });
        }, 3000);
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contHistory}>
          <HistoryView
            data={this.state._history}
            onClear={this._clearHistory}
          />
          <Message
            visible={this.state.messageVisible}
            message={this.state.message}
          />
        </View>
        <View style={styles.contOutput}>
          <View style={styles.placeHolderOutput}>
            <Text style={styles.txtDefault}>
              {this.state._resultSymbolOutput}
            </Text>
            <Text style={styles.txtDefault}>
              {this.state._resultNumberOutput}
            </Text>
          </View>
          <View style={styles.placeHolderOutput}>
            <Text style={styles.txtDefault}>{this.state._symbolOutput}</Text>
            <Text style={styles.txtDefault}>{this.state._numberOutput}</Text>
          </View>
        </View>
        <View style={styles.contButtons}>
          <NumberButtons onBtnPress={this._handleEvent} buttons={buttons} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: 20
      }
    }),
    flex: 1,
    flexDirection: "column"
  },
  contHistory: {
    flex: 0.45
  },
  contOutput: {
    flex: 0.25
  },
  contButtons: {
    flex: 0.9,
    backgroundColor: "#fff"
  },
  placeHolderOutput: {
    flex: 1,
    backgroundColor: "#dedede",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
    paddingHorizontal: 15
  },
  txtDefault: {
    color: "#000",
    fontFamily: "Helvetica-Light",
    fontSize: 30
  }
});
