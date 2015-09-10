'use strict';

var React = require('react-native');

var {
    Image,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    PixelRatio,
} = React;

var Articles = React.createClass({
	getInitialState: function () {
		return {
			articles: new ListView.DataSource({
            	rowHasChanged: (row1, row2) => row1 !== row2
        	}),
            seen: new Set()
		}
	},
	componentDidMount: function () {
		this.setState({
            articles: this.state.articles.cloneWithRows(this.props.articles)
        });
	},
	renderArticle: function (article, sectionId, rowId) {
        var link = article.title.href;
        var title = '';
        var titleArray = article.title.text.split('[心得]');
        var titleStyle;
        var dateStyle;

        if (titleArray.length === 1) {
            title = article.title.text.trim();
        } else {
            title = titleArray[1].trim();
        }
        if (this.state.seen.has(rowId)) {
            titleStyle = StyleSheet.create({
                title: {
                    paddingLeft: 10,
                    fontSize: 20,
                    textAlign: 'left',
                    color: '#aaa',
                },
            });
            dateStyle = StyleSheet.create({
                date: {
                    paddingLeft: 20,
                    marginTop: 5,
                    textAlign: 'left',
                    color: '#aaa',
                },
            });
        } else {
            titleStyle = styles;
            dateStyle = styles;
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onPressArticle.bind(this, link, rowId)}>
                    <View style={styles.rightContainer}>
                        <View style={styles.titleView}>
                            <Text style={styles.reviews}>{article.reviews}</Text>
                            <Text style={titleStyle.title}>{title}</Text>
                        </View>
                        <View style={styles.titleView}>
                            <Text style={dateStyle.date}>{article.date}</Text>
                            <Text style={dateStyle.author}>{article.author}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    },
    onPressArticle: function (link, index) {
        console.log(index);
        if (!this.state.seen.has(index)) {
            this.setState({
                seen: this.state.seen.add(index)
            });
        }
        this.props.showArticle(link);
    },
	render: function () {
		return (
			<ListView 
                dataSource = {this.state.articles} 
                renderRow={this.renderArticle} />
		);
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
        fontSize: 20,
        textAlign: 'left',
        color: '#fff',
    },
    titleView: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'visible',
    },
    reviews: {
        fontSize: 20,
        color: '#F9F900',
    },
    author: {
        textAlign: 'left',
        color: '#ddd',
        marginTop: 5,
        marginLeft: 10,
        fontSize: 15,
    },
    date: {
        fontSize: 15,
        paddingLeft: 20,
        marginTop: 5,
        textAlign: 'left',
        color: '#ccc',
    },
});

module.exports = Articles;