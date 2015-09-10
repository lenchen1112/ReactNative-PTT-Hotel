/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var REQUEST_URL = 'https://www.kimonolabs.com/api/7yhe8hai?apikey=ubpbfbw7GN6MuXUcdqdJZeevim3Xc7Cn';
var Articles = require('./src/Articles');
var Locations = require('./src/Locations');
var Header = require('./src/Header');

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    ListView,
    Text,
    View,
    Navigator,
    NavigatorIOS,
    LayoutAnimation,
    WebView
} = React;

var locations = ['基隆', '臺北', '台北', '桃園', '新竹', '苗栗', '臺中', '台中', '南投', '彰化', 
                 '雲林', '嘉義', '臺南', '台南', '高雄', '屏東', '宜蘭', '花蓮', '臺東', '台東',
                 '蘭嶼', '綠島', '澎湖', '金門', '馬祖'];

var StudyGroup = React.createClass({
    getInitialState: function () {
        return {
            presentLocations: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            classifiedData: {},
            loaded: false,
            loadingSymbolCount: 0,
        }
    },
    componentDidMount: function () {
        this.preprocessing();
        this.setTimerForLoading();
    },
    preprocessing: function () {
        var parsedLocations = locations.filter(function parseLocation (location) {
            return location !== '台北' && location !== '台中' && location !== '台南' && location !== '台東';
        });

        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            var classifiedData = {};
            locations.forEach(function (location) {
                if (['台北', '台中', '台南', '台東'].indexOf(location) > 0) {
                    return;
                }
                classifiedData[location] = [];
            });

            // pick article if it is categorized by 心情
            var results = responseData.results.collection1.filter(function filterResult (article) {
                return article.title.text.indexOf('[心得]')  > -1 || article.title.text.indexOf('[抱怨]') > -1;
            });

            results.forEach(function classifiedArticle (article) {
                var title = article.title.text;
                locations.forEach(function iterateLocation (location) {
                    if (title.indexOf(location) > -1) {
                        switch (location) {
                            case '台北': 
                                location = '臺北';
                                break;
                            case '台中': 
                                location = '臺中';
                                break;
                            case '台南':
                                location = '臺南';
                                break; 
                            case '台東': 
                                location = '臺東';
                                break;
                            default:
                                break;
                        }
                        classifiedData[location].push(article);
                    }
                });
            });

            this.setState({
                presentLocations: this.state.presentLocations.cloneWithRows(parsedLocations),
                classifiedData: classifiedData,
                loaded: true
            });
        })
        .done();
    },
    showArticle: function (link) {
        this.navigator.push({
            id: 'webView',
            link: link
        });
    },
    showLocations: function (location) {
        this.navigator.push({
            id: 'locationResults',
            location: location
        });
    },
    backToPrevious: function () {
        this.navigator.pop();
    },
    render: function () {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
             <Navigator
                initialRoute={{id: 'init', name: 'first screen', index: 0}}
                renderScene={this.renderScene} />
        );

         
    },
    renderLoadingView: function () {
        let loadingSymbol = '';
        let r = parseInt(Math.random() * 255);
        let g = parseInt(Math.random() * 255);
        let b = parseInt(Math.random() * 255);
        let symbolStyle = StyleSheet.create({
            loadingSymbol: {
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: 40,
                color: 'rgb(' + r + ',' + g + ',' + b + ')' ,
            },
        });
        for (let i = 0; i < this.state.loadingSymbolCount; i++) {
            loadingSymbol += '.';
        }
        return (
            <View style={styles.container}>
                <Text style={styles.loading}>HOTEL</Text>
                <Text style={styles.loading}>PARSER</Text>
                <Text style={symbolStyle.loadingSymbol}>{loadingSymbol}</Text>
            </View>
        );
    },
    setTimerForLoading: function () {
        setTimeout(() => {
            this.setState({
                loadingSymbolCount: this.state.loadingSymbolCount + 1
            });
            if (!this.state.loading && this.state.loadingSymbolCount < 30) {
                this.setTimerForLoading();
            }
        }, 100);
    },
    renderScene: function (route, navigator) {
        this.navigator = navigator;

        switch (route.id) {
            case 'locationResults':
                return (
                    <View style={styles.articles}>
                        <Header backToPrevious={this.backToPrevious} />
                        <Articles
                            articles={this.state.classifiedData[route.location]}
                            showArticle={this.showArticle} />
                    </View>
                );
                break;
            case 'webView':
                return (
                    <View style={styles.webContainerView}>
                        <Header backToPrevious={this.backToPrevious} />
                        <WebView
                            automaticallyAdjustContentInsets={false}
                            bounces={true}
                            url={route.link}
                            javaScriptEnabledAndroid={true}
                            startInLoadingState={true}
                            scrollEnabled={true}
                            scalesPageToFit={false}
                            style={styles.webView} />
                    </View>
                );
                break;
            case 'init':
            default:
                return (
                    <View style={styles.locations}>
                        <Header />
                        <Locations
                            presentLocations={this.state.presentLocations}
                            showLocations={this.showLocations} />
                    </View>
                );
                break;
        }
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    loading: {
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 60,
        color: '#fff'
    },
    articles: {
        flex: 1
    },
    webContainerView: {
        flex: 1
    },
    webView: {
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    locations: {
        flex: 1
    }
});

AppRegistry.registerComponent('StudyGroup', () => StudyGroup);