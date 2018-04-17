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
            containerWidth: Dimensions.get('window').width
        }
        this.style = styles;
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

    _onLayout = (e) => {
        const { width, } = e.nativeEvent.layout;
        this.setState({ containerWidth: width, });
    }

    _renderTab = ({ item, index }) => {
        return (<View
            style={[{ width: this.state.containerWidth }, this.style.tabContainer]}>
            {this.props.renderTab(item, index)}
        </View>);
    }

    _renderHeader = () => {
        return (<View style={this.style.headerContainer}>
            <DynamicTabViewScrollHeader
                data={this.props.data}
                goToPage={this.goToPage}
                selectedTab={this.state.index}
            />
        </View>)
    }

    render() {
        return (<View onLayout={this._onLayout} style={{ flex: 1 }}>
            {this._renderHeader()}
            <FlatList
                {...this.props}
                horizontal
                scrollEnabled={false}
                ref={(flatView) => { this.flatView = flatView; }}
                renderItem={this._renderTab}
                scrollEventThrottle={10}
                keyboardDismissMode={'on-drag'}
                getItemLayout={this.getItemLayout}
            >
            </FlatList>
        </View>
        );
    }
}

const styles = {
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

DynamicTabView.defaultStyle = {

}

DynamicTabView.defaultProps = {
    defaultIndex: 0
}

DynamicTabView.propTypes = {
    onChangeTab: PropTypes.func
}

export default DynamicTabView;