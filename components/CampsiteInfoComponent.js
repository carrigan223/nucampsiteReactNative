import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { CAMPSITES } from "../Shared/campsites";
import { COMMENTS } from "../Shared/comments";//importing comments array from shared

function RenderCampsite({ campsite }) {
  if (campsite) {
    //if onpress is initiated and it takes in an ID which our filer method will take in and return
    //a campsite, if this is all true we will return the card containing that campsites info
    return (
      <Card
        featuredTitle={campsite.name}
        image={require("./images/react-lake.jpg")}
      >
        <Text style={{ margin: 10 }}>{campsite.description}</Text>
      </Card>
    );
  }
  //else we just return the view
  return <View />;
}

function RenderComments({comments}) {
  const renderCommentItem = ({item}) => {
    return (
      <View style={{margin: 10}}>
        <Text style={{fontSize: 14}}>{item.text}</Text>
        <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
        <Text style={{fontSize: 12}}>{`-- ${item.text}, ${item.date}`}</Text>
      </View>
    );
  }
  
  return (
    <Card title='Comments'>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      comments: COMMENTS,
    };
  } //our array of campsite data and comment data is held in state

  static navigationOptions = {
    title: "Campsite Information",
  };

  render() {
    const campsiteId = this.props.navigation.getParam("campsiteId"); //when we use the onpress we are getting the param of campsite id
    const campsite = this.state.campsites.filter(
      (campsite) => campsite.id === campsiteId
    )[0]; //we are using the filter method to pick out the matching id of the pressed campsite
    const comments = this.state.comments.filter(comment => comment.campsiteId === campsiteId);
    //filtering out the comments that match our campsiteId

    return (
      <ScrollView>
        <RenderCampsite campsite={campsite} />
        <RenderComments comments={comments} />
      </ScrollView>
    );
  }
}

export default CampsiteInfo;
