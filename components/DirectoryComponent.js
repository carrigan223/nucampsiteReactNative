import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../Shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
  };
}; //the data from our campsites array is being maintaned in a server which we have access to through redux

class Directory extends Component {
  static navigationOptions = {
    title: "Directory",
  };

  render() {
    const { navigate } = this.props.navigation; //this.props are the auto navigation propertys
    //supplied to screen components
    const renderDirectoryItem = ({item}) => {
      return (
        <ListItem
          title={item.name}
          caption={item.description}
          featured
          onPress={() => navigate("CampsiteInfo", { campsiteId: item.id })}
          //onpress is returning the navigate method we took from this.props.navigation
          //optional second param is an object where we can specify the specific id of the param
          imgSrc={{uri: baseUrl + item.image }}
        />

      );
    }; //why imgsrc over left avatar, why cant i acces my item properties

    return (
      <FlatList
        data={this.props.campsites.campsites} //the array which we our passing to our list which is held in state
        renderItem={renderDirectoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Directory);
