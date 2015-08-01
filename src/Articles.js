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
        	})
		}
	},
	componentDidMount: function () {
		this.setState({
            articles: this.state.articles.cloneWithRows(this.props.articles)
        });
	},
	renderArticle: function (article) {
        var link = article.title.href;
        var title = '';
        var titleArray = article.title.text.split('[心得]');
        if (titleArray.length === 1) {
            title = article.title.text.trim();
        } else {
            title = titleArray[1].trim();
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onPressArticle.bind(this, link)}>
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{article.reviews}  {title}</Text>
                        <Text style={styles.year}>{article.date} {article.author}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    },
    onPressArticle: function (link) {
        this.props.showArticle(link);
    },
	render: function () {
		return (
			<ListView 
                dataSource = {this.state.articles} 
                renderRow={this.renderArticle}
                style={styles.listView} />
		);
	}
});

var styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        marginBottom: 4,
        marginTop: 8,
        textAlign: 'left',
    },
    date: {
        textAlign: 'left',
    },
});

module.exports = Articles;