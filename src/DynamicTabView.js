import React from 'react'
import {
    ScrollView,
    View,
    Dimensions,
    FlatList,
    TouchableHighlight,
    Text
} from 'react-native';
import DynamicTabViewScrollHeader from './DynamicTabViewScrollHeader';
import PropTypes from 'prop-types';

class DynamicTabView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: this.props.defaultIndex,
            containerWidth: Dimensions.get('window').width,
            begin_offset: null,
            end_offset: null
        }
        this.defaultStyle = defaultStyle;
    }

    componentDidMount() {
        //HACK 
        let wait = new Promise((resolve) => setTimeout(resolve, 100));
        wait.then(() => {
            this.flatView.scrollToIndex({ index: this.state.index, animated: false });
        });
    }

    getItemLayout = (data, index) => (
        { length: this.state.containerWidth, offset: this.state.containerWidth * index, index }
    )

    goToPage = (index) => {
        this.setState({ index })
        this.flatView.scrollToIndex({ index });
        if (this.props.onChangeTab) {
            this.props.onChangeTab(index);
        }
    }

    onScrollBeginDrag = (e) => {
        var begin_offset = e.nativeEvent.contentOffset.x; //since horizontal scroll view begin 
        // console.log(begin_offset);
        this.setState({ begin_offset });
    }

    onScrollEndDrag = (e) => {
        var end_offset = e.nativeEvent.contentOffset.x; // since horizontal scroll view end
        // console.log(end_offset)
        this.setState({ end_offset });
    }

     // To calculate Page scroll from left->right or right->left
    _onCalculateIndex = (begin_offset, end_offset, width) => {
        var begin_offset = this.state.begin_offset;
        var end_offset = this.state.end_offset;
        var width = this.state.containerWidth;

        if (begin_offset < end_offset) {
            let index = begin_offset/width + 1; // if Page scroll from left->right, index is increase by 1 

            if (index < this.props.data.length) {
                this.goToPage(index);
            }
        } else if (begin_offset > end_offset || begin_offset === end_offset) {
            let index = begin_offset/width - 1; // if Page scroll from right->left, index is decrease by 1

            if (index < this.props.data.length && index !== -1) {
                this.goToPage(index);
            }
        }
    }

    _onLayout = (e) => {
        const { width, } = e.nativeEvent.layout;
        this.setState({ containerWidth: width, });
    }

    _renderTab = ({ item, index }) => {
        return (<View
            style={[{ width: this.state.containerWidth }, this.defaultStyle.tabContainer, this.props.tabContainerStyle]}>
            {this.props.renderTab(item, index)}
        </View>);
    }

    _renderHeader = () => {
        return (<View style={[this.defaultStyle.headerContainer, this.props.headerContainerStyle]}>
            <DynamicTabViewScrollHeader
                data={this.props.data}
                goToPage={this.goToPage}
                selectedTab={this.state.index}
                tabItemContainerStyle={this.props.tabItemContainerStyle}
            />
        </View>)
    }

    render() {
        return (<View onLayout={this._onLayout} style={[this.defaultStyle.container, this.props.containerStyle]}>
            {this._renderHeader()}
            <FlatList
                {...this.props}
                horizontal
                scrollEnabled={true}
                ref={(flatView) => { this.flatView = flatView; }}
                styleCustomization={this.props.styleCustomization}
                renderItem={this._renderTab}
                scrollEventThrottle={10}
                keyboardDismissMode={'on-drag'}
                getItemLayout={this.getItemLayout}
                pagingEnabled={true}
                onMomentumScrollBegin={this._onCalculateIndex}
                onScrollBeginDrag={this.onScrollBeginDrag}
                onScrollEndDrag={this.onScrollEndDrag}
            >
            </FlatList>
        </View>
        );
    }
}

defaultStyle = {
    container: {
        flex: 1
    },
    headerContainer: {
        backgroundColor: 'white'
    },
    tabContainer: {
        flex: 1
    },
    labelStyle: {
        color: 'white',
    },
    indicatorStyle: {
        backgroundColor: 'white',
        marginVertical: 1,
        bottom: 4, //indicatorStyle is implemented in absolute in the library
        height: 4,
    }
}

DynamicTabView.defaultProps = {
    defaultIndex: 0,
    'containerStyle': {},
    'tabContainerStyle': {},
    'headerContainerStyle': {},

    //styles for header
    tabItemContainerStyle: {},
    tabItemTextStyle:{},
    highlightStyle:{},
    noHighlightStyle:{}
}

DynamicTabView.propTypes = {
    onChangeTab: PropTypes.func,
    styleCustomization: PropTypes.object,
    containerStyle: PropTypes.any,
    tabContainerStyle: PropTypes.any,
    headerContainerStyle: PropTypes.any,
    //header style props
    tabItemContainerStyle: PropTypes.any,
    tabItemTextStyle: PropTypes.any, 
    highlightStyle: PropTypes.any,
    noHighlightStyle: PropTypes.any
}

export default DynamicTabView;