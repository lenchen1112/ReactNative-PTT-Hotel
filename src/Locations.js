'use strict';

var React = require('react-native');

var {
    Image,
    ScrollView,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} = React;

var Locations = React.createClass({
	renderLocation: function (location) {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onPressLocation.bind(this, location)}>
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{location}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    },
    onPressLocation: function (location) {
        this.props.showLocations(location);
    },
	render: function () {
		return <ListView
                    initialListSize={15}
                    dataSource={this.props.presentLocations}
                    renderRow={this.renderLocation} />
	}
});

var styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderBottomColor: '#fff',
        borderWidth: 0.5,
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        paddingLeft: 10,
        fontSize: 35,
        textAlign: 'left',
        color: '#fff'
    },
});

module.exports = Locations;