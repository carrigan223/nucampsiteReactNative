import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { CAMPSITES } from "../Shared/campsites";//our campsites data array from shared folder

class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
    };//the data from our campsites array is being maintaned in state
  }

  static navigationOptions = {
    title: "Directory",
  };

  render() {
    const { navigate } = this.props.navigation;//this.props are the auto navigation propertys
    //supplied to screen components
    const renderDirectoryItem = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          onPress={() => navigate("CampsiteInfo", { campsiteId: item.id })}
          //onpress is returning the navigate method we took from this.props.navigation
          //optional second param is an object where we can specify the specific id of the param
          leftAvatar={{ source: require("./images/react-lake.jpg") }}
        />
      );
    };

    return (
      <FlatList
        data={this.state.campsites}//the array which we our passing to our list which is held in state
        renderItem={renderDirectoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default Directory;
