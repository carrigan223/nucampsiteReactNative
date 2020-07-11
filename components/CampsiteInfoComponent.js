import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../Shared/baseUrl";
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    favorites: state.favorites
  };
};
//above is connecting us to the redux store which from this point forward will be handling our state and allowing us to perform asynchronous actions

const mapDispatchToProps = {
  postFavorite: campsiteId => (postFavorite(campsiteId))
};

function RenderCampsite(props) {
  const { campsite } = props;

  if (campsite) {
    //if onpress is initiated and it takes in an ID which our filer method will take in and return
    //a campsite, if this is all true we will return the card containing that campsites info
    console.log("favorites", props.favorite);
    return (
      <Card
        featuredTitle={campsite.name}
        image={{ uri: baseUrl + campsite.image }}
      >
        <Text style={{ margin: 10 }}>{campsite.description}</Text>
        <Icon //this icon is the font awesome heart displayed uder the description
          name={props.favorite ? "heart" : "heart-o"}
          //the name is checking the props we drilled to render campsite
          //if true it is heart  if false it is the outline
          type="font-awesome"
          color="#f50"
          raised
          reverse
          onPress={() =>
            props.favorite
              ? console.log("Already set as a favorite")
              : props.markFavorite()
          }
        />
      </Card>
    );
  }
  //else we just return the view
  return <View />;
}
//the below function is taking the filtered array comments as its params
function RenderComments({ comments }) {
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>{`-- ${item.text}, ${item.date}`}</Text>
      </View>
    ); //renderCommentItem is taking each of our items in the array destructuring
    //and we are then returning  our view with the text being the properties of our
    //destructured comment/item
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  ); //the data being passed in to our flatlist is the filtered array of comments
  //then for each item is rendering the constant renderCommentItem
}

class CampsiteInfo extends Component {



  markFavorite(campsiteId) {
    this.props.postFavorite(campsiteId);
  } //the markFavorite function when ran sets favorite to true

  static navigationOptions = {
    title: "Campsite Information",
  };

  render() {
    const campsiteId = this.props.navigation.getParam("campsiteId"); //when we use the onpress we are getting the param of campsite id
    const campsite = this.props.campsites.campsites.filter(
      (campsite) => campsite.id === campsiteId
    )[0]; //we are using the filter method to pick out the matching id of the pressed campsite
    const comments = this.props.comments.comments.filter(
      (comment) => comment.campsiteId === campsiteId
    );
    //filtering out the comments that match our campsiteId,
    //this filter method is creating a new array which we are assigning
    //as comments

    return (
      <ScrollView>
        <RenderCampsite
          campsite={campsite}
          favorite={this.props.favorites.includes(campsiteId)}
          markFavorite={() => this.markFavorite(campsiteId)}
        />
        <RenderComments comments={comments} />
      </ScrollView>
    ); //scrollview is wrapping everything displayed and scrolled through on the screen
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
