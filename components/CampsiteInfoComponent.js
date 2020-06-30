import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";
import { CAMPSITES } from "../Shared/campsites";

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

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
    };
  } //our array of campsite data is held in state

  static navigationOptions = {
    title: "Campsite Information",
  };

  render() {
    const campsiteId = this.props.navigation.getParam("campsiteId"); //when we use the onpress we are getting the param of campsite id
    const campsite = this.state.campsites.filter(
      (campsite) => campsite.id === campsiteId
    )[0]; //we are using the filter method to pick out the matching id of the pressed campsite
    return <RenderCampsite campsite={campsite} />; //
  }
}

export default CampsiteInfo;
