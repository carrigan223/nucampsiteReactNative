import React, { Component } from "react";
import { ScrollView, Text, FlatList } from "react-native";
import { Card, ListItem } from "react-native-elements";
import Mission from "./MissionComponent";
import { PARTNERS } from "../Shared/partners";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: PARTNERS,
    };
  }

  static navigationOptions = {
    title: "About Us",
  };

  render() {
    const renderPartner = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          leftAvatar={{ source: require("./images/bootstrap-logo.png") }}
        />
      );
    };

    return (
      <ScrollView>
        <Mission />
        <Card title={"Community Partners"}>
          <FlatList
            data={this.state.partners}
            renderItem={renderPartner}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </ScrollView>
    );
  }
}

export default About;
