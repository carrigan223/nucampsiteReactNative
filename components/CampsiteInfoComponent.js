import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  Alert,
  PanResponder,
  Share,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../Shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    favorites: state.favorites,
  };
};
//above is connecting us to the redux store which from this point forward will be handling our state and allowing us to perform asynchronous actions

const mapDispatchToProps = {
  postFavorite: (campsiteId) => postFavorite(campsiteId),
  postComment: (campsiteId, rating, author, text) =>
    postComment(campsiteId, rating, author, text),
};

function RenderCampsite(props) {
  const { campsite } = props;

  const view = React.createRef();

  const recognizeDrag = ({ dx }) => (dx < -200 ? true : false);
  const recognizeDragLeft = ({ dx }) => (dx > 200 ? true : false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? "finished" : "canceled")
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add " + campsite.name + " to favorites?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
            {
              text: "OK",
              onPress: () =>
                props.favorite
                  ? console.log("Already set as a favorite")
                  : props.markFavorite(),
            },
          ],
          { cancelable: false }
        );
      } else if (recognizeDragLeft(gestureState)) {
        props.onShowModal();
      } else true;
    },
  });

  const shareCampsite = (title, message, url) => {
    Share.share(
      {
        title,
        message: `${title}: ${message} ${url}`,
        url,
      },
      {
        dialogTitle: "Share " + title,
      }
    );
  };

  if (campsite) {
    //if onpress is initiated and it takes in an ID which our filer method will take in and return
    //a campsite, if this is all true we will return the card containing that campsites info
    console.log("favorites", props.favorite);
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={view}
        {...panResponder.panHandlers}
      >
        <Card
          featuredTitle={campsite.name}
          image={{ uri: baseUrl + campsite.image }}
        >
          <Text style={{ margin: 10 }}>{campsite.description}</Text>
          <View style={styles.cardRow}>
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
            <Icon
              style={styles.cardItem}
              name="pencil"
              type="font-awesome"
              raised
              color="#5637DD"
              reverse
              onPress={() => props.onShowModal()}
            />
            <Icon
              name={"share"}
              type="font-awesome"
              color="#5637DD"
              style={styles.cardItem}
              raised
              reverse
              onPress={() =>
                shareCampsite(
                  campsite.name,
                  campsite.description,
                  baseUrl + campsite.image
                )
              }
            />
          </View>
        </Card>
      </Animatable.View>
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
        <Rating
          readonly
          startingValue={item.rating}
          imageSize={10}
          style={{ alignItems: "flex-start", paddingVertical: "5%" }}
        />
        <Text
          style={{ fontSize: 12 }}
        >{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    ); //renderCommentItem is taking each of our items in the array destructuring
    //and we are then returning  our view with the text being the properties of our
    //destructured comment/item
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  ); //the data being passed in to our flatlist is the filtered array of comments
  //then for each item is rendering the constant renderCommentItem
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      rating: 5,
      author: "",
      text: "",
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment = (campsiteId) => {
    this.props.postComment(
      campsiteId,
      this.state.rating,
      this.state.author,
      this.state.text
    );
    this.toggleModal();
  };

  resetForm() {
    this.setState({
      showModal: false,
      rating: "5",
      author: "",
      text: "",
      //comment: "",
    });
  }

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
          onShowModal={() => this.toggleModal()}
        />
        <RenderComments comments={comments} />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              style={{ paddingVertical: 10 }}
              showRating
              startingValue={this.state.rating}
              imageSize={40}
              onFinishRating={(rating) => this.setState({ rating })}
            />
            <Input
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              placeholder="Author"
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(author) => this.setState({ author })}
              value={this.state.author}
            />
            <Input
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              placeholder="Comment"
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(comment) => this.setState({ text: comment })}
              value={this.state.text}
            />
          </View>
          <View>
            <Button
              title="submit"
              color="#5637DD"
              onPress={() => {
                this.handleComment(campsiteId);
                this.resetForm();
              }}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => {
                this.toggleModal();
                this.resetForm();
              }}
              color="#808080"
              title="Cancel"
            />
          </View>
        </Modal>
      </ScrollView>
    ); //scrollview is wrapping everything displayed and scrolled through on the screen
  }
}

const styles = StyleSheet.create({
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  cardItem: {
    flex: 1,
    margin: 10,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
