import React, { Component } from "react";
import Home from "./HomeComponent";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator,
  DrawerItems } from 'react-navigation';
import { Icon } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";

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
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    Directory: {
      screen: DirectoryNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="list" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: "About Us",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="info-circle"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        drawerLabel: "Contact Us",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="address-card"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    drawerBackgroundColor: "#CEC8FF",
    contentComponent: (props) => (
      <ScrollView>
          <SafeAreaView 
              style={styles.container}
              forceInset={{top: 'always', horizontal: 'never'}}>
              <View style={styles.drawerHeader}>
                  <View style={{flex: 1}}>
                      <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                  </View>
                  <View style={{flex: 2}}>
                      <Text style={styles.drawerHeaderText}>NuCamp</Text>
                  </View>
              </View>
              <DrawerItems {...props} />
          </SafeAreaView>
      </ScrollView>
    ),
  }
); //this is our main navigator which is the drawer navigator we can pull from the left,each navigator has an icon
//the contencComponent property is overriding the default drawer content with the component we built

// const CustomDrawerContentComponent = (props) => (
//   <ScrollView>
//       <SafeAreaView 
//           style={styles.container}
//           forceInset={{top: 'always', horizontal: 'never'}}>
//           <View style={styles.drawerHeader}>
//               <View style={{flex: 1}}>
//                   <Image source={require('./images/logo.png')} style={styles.drawerImage} />
//               </View>
//               <View style={{flex: 2}}>
//                   <Text style={styles.drawerHeaderText}>NuCamp</Text>
//               </View>
//           </View>
//           <DrawerItems {...props} />
//       </SafeAreaView>
//   </ScrollView>
// );
//try to figure out why the original way didnt work

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
  container: {
      flex: 1,
  },
  drawerHeader: {
      backgroundColor: '#5637DD',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
  },
  drawerHeaderText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold'
  },
  drawerImage: {
      margin: 10,
      height: 60,
      width: 60
  },
  stackIcon: {
      marginLeft: 10,
      color: '#fff',
      fontSize: 24
  }
});
export default Main;
