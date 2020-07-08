import React, { Component } from "react";
import Home from "./HomeComponent";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import { View, Platform, StyleSheet } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact },
  },
  {
    //initialRouteName: "Contact", //this is our default starting point
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="address-card"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
); //this navigator and header is for our contact screen

const AboutNavigator = createStackNavigator(
  {
    About: { screen: About },
  },
  {
    //initialRouteName: "About", //this is our default starting point(i dont know why this or contact have initial route navigator but dont think i need it )
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="info-circle"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
); //this navigator and header is for our about screen

const DirectoryNavigator = createStackNavigator(
  {
    Directory: {
      screen: Directory,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="list"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }), //above navigation options are displaying our header icon and giveing it the ability
      //to toggle the drawer via on press
    },
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
); //using createStackNavigator to build our stack for navigation purposes,
//this is the heading and navigation for our directory screen

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTinetColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="home"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
); //this navigator is for the home screen

const MainNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeNavigator },
    Directory: { screen: DirectoryNavigator },
    About: { screen: AboutNavigator },
    Contact: { screen: ContactNavigator },
  },
  {
    drawerBackgroundColor: "#CEC8FF",
  }
); //this is our main navigator which is the drawer navigator we can pull from the left

class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }} //this paddingtop property is check the OS and adjusting the top padding accordingly
      >
        <MainNavigator />
      </View>
    ); //main is using MainNavigator to determine what we are viewing and keeping track of the stack
  }
}

const styles = StyleSheet.create({
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
});

export default Main;
