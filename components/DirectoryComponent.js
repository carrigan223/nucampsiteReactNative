import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Directory(props) {
    const renderDirectoryItem = ({item}) => {
        return (
            <ListItem 
                title={item.name}
                subtitle={item.description}
                onPress={() => props.onPress(item.id)}
                leftAvatar={{ source: require('./images/react-lake.jpg')}}
            />
        );
    };
    return (
        <FlatList 
            data={props.campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}
//this function directory is taking props(of the array of campsites) 
//and those properites are being passed as properties to the list of items we are rendering
export default Directory;