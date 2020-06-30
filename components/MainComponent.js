import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import { View, Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

const DirectoryNavigator = createStackNavigator(
  {
    Directory: { screen: Directory },
    CampsiteInfo: { screen: CampsiteInfo },
  },
  {
    initialRouteName: "Directory",//this is our default starting point
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);//using createStackNavigator to build our stack for navigation purposes

class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <DirectoryNavigator />
      </View>
    );//main is using DirectoryNavigator to determine what we are viewing and keeping track of the stack
  }
}

export default Main;
