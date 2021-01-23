import React from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  ColorValue,
  TextStyle
} from 'react-native';
import DynamicTabViewScrollHeader from './DynamicTabViewScrollHeader';
import PropTypes from 'prop-types';
export interface DynamicTabProps {
  defaultIndex: Number,
  containerStyle: StyleSheet,
  headerContainerStyle: StyleSheet,
  headerBackgroundColor: ColorValue,
  headerTextStyle: StyleSheet,
  headerActiveTextStyle: StyleSheet,
  headerUnderlayColor: ColorValue,
  highlightStyle: StyleSheet,
  data: any,
  styleCustomization: any,
  tabContainerStyle: StyleSheet
  noHighlightStyle: StyleSheet,
  extraData: any
}
const DynamicTabView: React.FC<DynamicTabProps> = (props) => {
  const { containerStyle,
    headerContainerStyle,
    headerBackgroundColor,
    headerTextStyle,
    headerActiveTextStyle,
    headerUnderlayColor,
    highlightStyle,
    styleCustomization,
    tabContainerStyle,
    noHighlightStyle,
    extraData,
    data, ...restProps } = props;
  const [index, setIndex] = React.useState(props.defaultIndex ? props.defaultIndex : 0);
  const [containerWidth, setContainerWidth] = React.useState(Dimensions.get("window").width);
  const [beginOffset, setBeginOffset] = React.useState(null);
  const [endOffset, setEndOffset] = React.useState(null);
  let flatView;
  let headerRef;
  const getItemLayout = (data, index) => ({
    length: containerWidth,
    offset: containerWidth * index,
    index
  });

  const goToPage = index => {
    setIndex(index)
    flatView.scrollToIndex({ index });
    /*if (this.props.onChangeTab) {
      this.props.onChangeTab(index);
    }*/

    headerRef.scrollHeader(index);
  };

  const onScrollBeginDrag = e => {
    let beginOffset = e.nativeEvent.contentOffset.x; //since horizontal scroll view begin
    // console.log(begin_offset);
    setBeginOffset(beginOffset)
  };

  const onScrollEndDrag = e => {
    let endOffset = e.nativeEvent.contentOffset.x; // since horizontal scroll view end
    // console.log(end_offset)
    setEndOffset(endOffset)
  };

  const onLayout = e => {
    const { width } = e.nativeEvent.layout;
    setContainerWidth(width)
  };
  const RenderHeader = () => {
    return (
      <View
        style={[
          styles.headerContainer,
          headerContainerStyle
        ]}
      >
        <DynamicTabViewScrollHeader
          data={data}
          goToPage={goToPage}
          selectedTab={index}
          headerBackgroundColor={headerBackgroundColor}
          headerTextStyle={headerTextStyle}
          headerActiveTextStyle={headerActiveTextStyle}
          headerUnderlayColor={headerUnderlayColor}
          highlightStyle={highlightStyle}
          noHighlightStyle={noHighlightStyle}
          extraData={extraData}
        />
      </View>
    );
  };
  const RenderTab = ({ item }) => {
    return (
      <View
        style={[
          { width: containerWidth },
          styles.tabContainer,
          tabContainerStyle
        ]}
      >
        {item}
      </View>
    );
  };
  return (
    <View
      onLayout={onLayout}
      style={[styles.container, containerStyle]}
    >
      {RenderHeader}
      <FlatList
        {...props}
        horizontal
        scrollEnabled={true}
        // styleCustomization={styleCustomization}
        renderItem={({ item }) => RenderTab(item)}
        scrollEventThrottle={10}
        keyboardDismissMode={"on-drag"}
        getItemLayout={getItemLayout}
        pagingEnabled={true}
      //onMomentumScrollBegin={this._onCalculateIndex}
      //onScrollBeginDrag={this.onScrollBeginDrag}
      //onScrollEndDrag={this.onScrollEndDrag}
      />
    </View>
  );

}

const styles: any = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    backgroundColor: "white"
  },
  tabContainer: {
    flex: 1
  },
  labelStyle: {
    color: "white"
  },
  indicatorStyle: {
    backgroundColor: "white",
    marginVertical: 1,
    bottom: 4, //indicatorStyle is implemented in absolute in the library
    height: 4
  }
});

export default DynamicTabView;