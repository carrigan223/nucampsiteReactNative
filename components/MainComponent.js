import React, { Component } from "react";
import Home from "./HomeComponent";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
// import About from "./AboutComponent";
// import Contact from "./ContactComponent";
import { View, Platform } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

// const ContactNavigator = createStackNavigator(
//   {
//     Contact: { screen: Contact },
//   },
//   {
//     initialRouteName: "Contact", //this is our default starting point
//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: "#5637DD",
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         color: "#fff",
//       },
//     },
//   }
// );

// const AboutNavigator = createStackNavigator(
//   {
//     About: { screen: About },
//   },
//   {
//     initialRouteName: "About", //this is our default starting point
//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: "#5637DD",
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         color: "#fff",
//       },
//     },
//   }
// );

const DirectoryNavigator = createStackNavigator(
  {
    Directory: { screen: Directory },
    CampsiteInfo: { screen: CampsiteInfo },
  },
  {
    initialRouteName: "Directory", //this is our default starting point
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
); //using createStackNavigator to build our stack for navigation purposes

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTinetColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeNavigator },
    Directory: { screen: DirectoryNavigator },
    //About: { screen: AboutNavigator },
    //Contact: { screen: ContactNavigator },
  },
  {
    drawerBackgroundColor: "#CEC8FF",
  }
);

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
        <MainNavigator />
      </View>
    ); //main is using MainNavigator to determine what we are viewing and keeping track of the stack
  }
}

export default Main;
