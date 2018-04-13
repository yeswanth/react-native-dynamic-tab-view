import React from 'react';
import {
    Button,
    TouchableHighlight,
    Text,
    FlatList,
    View
} from 'react-native';
import PropTypes from 'prop-types';
class DynamicTabViewScrollHeader extends React.Component {
    constructor(props) {
        super(props);
        this.style = styles;
        this.state = {
            selected:this.props.selectedTab
        }
    }

    _onPressHeader = (index) => {
        this.props.goToPage(index);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.selectedTab !== this.props.selectedTab){
            this.setState({selected:nextProps.selectedTab})
        }
    }

    _renderTitle = ({ item, index }) => {
        let showHighlight = index === this.state.selected;
        return (
            <TouchableHighlight
                onPress={this._onPressHeader.bind(this, index)}
                style={this.style.tabContainer}
                underlayColor={"#aaaaaa"}
            >
                <View>
                    <Text>{item['title']}</Text>
                    {this._renderHighlight(showHighlight)}
                </View>
            </TouchableHighlight>
        )
    }

    _renderHighlight = (showHighlight) => {
        if (showHighlight) {
            return (<View style={this.style.highlight}></View>)
        } else {
            return (<View style={this.style.noHighlight}></View>)
        }
    }

    render() {
        return (
            <FlatList
                horizontal
                alwaysBounceHorizontal={false}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                data={this.props.data}
                extraData={this.state}
                renderItem={this._renderTitle}
            />
        )
    }
}

const styles = {
    tabContainer: {
        overflow: 'hidden',
        backgroundColor: '#555555',
        "padding": 20,
        justifyContent: 'center',
        'alignItems': 'center'
    },
    highlight:{
        backgroundColor:'white',
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginTop: 5
    },
    noHighlight:{
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginTop: 5
    }
}

DynamicTabViewScrollHeader.defaultProps = {
    selectedTab: 0
}

DynamicTabViewScrollHeader.propTypes = {
    goToPage: PropTypes.func.isRequired,
    selectedTab: PropTypes.number.isRequired,
}



export default DynamicTabViewScrollHeader;