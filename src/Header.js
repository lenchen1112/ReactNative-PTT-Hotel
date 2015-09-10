'use strict';

var React = require('react-native');
var Icon = require('FAKIconImage');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    LayoutAnimation,
    PixelRatio,
    ScrollView,
    TouchableHighlight,
} = React;

var Header = React.createClass({
    backToPrevious: function () {
        this.props.backToPrevious();
    },
    render: function() {
        var backButton = this.props.backToPrevious ? 
            (
                <TouchableHighlight underlayColor="#eeeeee" style={{marginTop: 5, borderRadius: 15, marginLeft: 20, width: 30, height: 30}} onPress={this.backToPrevious}>
                    <Icon
                        name='fontawesome|chevron-left'
                        size={20}
                        color='#fff'
                        style={{width: 30, height: 30, flex: 1, borderRadius: 15, textAlign: 'right'}}
                    /> 
                </TouchableHighlight>
            ) : null;
        return (
            <View>
                <View style={styles.header}>
                    <View style={styles.headerView}>
                        {backButton}
                    </View>
                    <View style={styles.headerView}>
                        <Text style={styles.headerMiddle}>PTT Hotel</Text>
                    </View>
                    <View style={styles.headerView}>
                    </View>
                </View>
                <View style={styles.separator} />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        height: 120 / PixelRatio.get(),
        backgroundColor: '#000',
    },
    headerView: {
        flex: 1
    },
    headerMiddle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#b93',
        fontSize: 25
    },
    separator: {
        height: 1 / PixelRatio.get(),
        backgroundColor: '#bbbbbb'
    }
});

module.exports = Header;