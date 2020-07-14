import React, { Component } from "react";
import { FlatList, View, Text, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import Swipeout from "react-native-swipeout";
import { connect } from "react-redux";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../Shared/baseUrl";
import { deleteFavorite } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    favorites: state.favorites,
  };
}; // passing the state to component as props

const mapDispatchToProps = {
  deleteFavorite: (campsiteId) => deleteFavorite(campsiteId),
};
//we have to dispatch the delete favorite ation from redux by using mapdispatch to props
class Favorites extends Component {
  static navigationOptions = {
    title: "My Favorites",
  }; //will be connecting this to our stack navigator to use in the drawer this will be our title

  render() {
    const { navigate } = this.props.navigation; // this is allowing us to access the navigate function from our navigation properties
    const renderFavoriteItem = ({ item }) => {
      const rightButton = [
        {
          text: "Delete",
          type: "delete",
          onPress: () => {
            Alert.alert(
              "Delete Favorite?",
              "Are you sure you want to delete favorite campsite " +
                item.name +
                "?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log(item.name + " Not Deleted"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => this.props.deleteFavorite(item.id),
                },
              ],
              { cancelable: false }
            );
          },
        },
      ]; //this array is containing the delete button object in in the rightbutton
      return (
        <Swipeout right={rightButton} autoClose={true}>
          <Animatable.View animation="fadeInRightBig" duration={2000}>
            <ListItem
              title={item.name}
              subtitle={item.description}
              leftAvatar={{ source: { uri: baseUrl + item.image } }} //this avatar is sourced eith the image property
              onPress={() => navigate("CampsiteInfo", { campsiteId: item.id })} //we are using the navigate function we pulled from navigation to make the campsite pressable
            />
          </Animatable.View>
        </Swipeout>
      ); //this is taking the items we have filtered already in our flatlist and we are nesting
      //it in a swipout component to give us a hidden button to delete favorites
    };

    if (this.props.campsites.isLoading) {
      return <Loading />;
    } //if true loading property will return the loading component
    if (this.props.campsites.errMess) {
      return (
        <View>
          <Text>{this.props.campsites.errMess}</Text>
        </View>
      );
    } //if true errMess will return the errMess property of the campsite
    return (
      <FlatList
        data={this.props.campsites.campsites.filter((campsite) =>
          this.props.favorites.includes(campsite.id)
        )} //for our data filtering through this.props.campsites(we have mapped our state to props this is how we access)
        //returning ones marked favorites
        renderItem={renderFavoriteItem} //calling the renderFavoriteItem method we created above
        keyExtractor={(item) => item.id.toString()}
      />
    ); //else we return our flatlist which filters out campistes which our favorites
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites); //connected to redux store which is managing our state
