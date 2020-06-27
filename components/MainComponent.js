import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import { CAMPSITES } from "../Shared/campsites";
import { View } from "react-native";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      selectedCampsite: null,
    };
  } //class main extends component and is the parent containing our campsite array in state and is being exported
  //to app.js
  //it also is rendering the child Directory

  onCampsiteSelect(campsiteId) {
    this.setState({ selectedCampsite: campsiteId });
  } //reassigning selectedCampsite property to the selected campsite upon choosing

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Directory
          campsites={this.state.campsites}
          onPress={(campsiteId) => this.onCampsiteSelect(campsiteId)}
        />
        <CampsiteInfo
          campsite={
            this.state.campsites.filter(
              (campsite) => campsite.id === this.state.selectedCampsite
            )[0]
          }
        />
      </View>
    );
  }
}

export default Main;
