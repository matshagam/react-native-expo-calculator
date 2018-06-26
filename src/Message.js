import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Message extends PureComponent {
  render() {
    const visible = this.props.messageVisible;

    return visible ? (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.value}</Text>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    position: "absolute",
    flex: 1,
    bottom: 0,
    width: "100%",
    height: 36,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#000",
    fontFamily: "Helvetica-Light",
    fontSize: 16
  }
});
