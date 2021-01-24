import React from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  ColorValue,
  TextStyle, Text
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
  tabContainerStyle: StyleSheet
  noHighlightStyle: StyleSheet,
  extraData: any,
  renderTab: CallableFunction,
  onChangeTab: CallableFunction
}
const DynamicTabView: React.FC<DynamicTabProps> = (props) => {
  const { containerStyle,
    headerContainerStyle,
    headerBackgroundColor,
    headerTextStyle,
    headerActiveTextStyle,
    headerUnderlayColor,
    highlightStyle,
    tabContainerStyle,
    noHighlightStyle,
    extraData,
    data, ...restProps } = props;
  const [index, setIndex] = React.useState(props.defaultIndex ? props.defaultIndex : 0);
  const [containerWidth, setContainerWidth] = React.useState(Dimensions.get("window").width);
  const [beginOffset, setBeginOffset] = React.useState(null);
  const [endOffset, setEndOffset] = React.useState(null);
  const flatListRef = React.useRef(null);
  const scrollHeaderRef = React.useRef(null);
  const getItemLayout = (data, index) => ({
    length: containerWidth,
    offset: containerWidth * index,
    index
  });

  const goToPage = index => {
    setIndex(index)

    flatListRef?.current?.scrollToIndex({ index });

    if (props.onChangeTab) {
      props.onChangeTab(index);
    }
    //console.log(scrollHeaderRef?.current);
    scrollHeaderRef?.current?.scrollHeader(index);
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
          scrollFlatRef={scrollHeaderRef}
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
  const onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    goToPage(pageNum);
  }
  const RenderTab = ({ item, index }) => {
    return (
      <View
        style={[
          { width: containerWidth },
          styles.tabContainer,
          tabContainerStyle
        ]}
      >
        {props.renderTab(item, index)}
      </View>
    );
  };
  return (
    <View
      onLayout={onLayout}
      style={[styles.container, containerStyle]}
    >
      {RenderHeader()}
      <FlatList
        data={data}
        horizontal
        ref={flatListRef}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={RenderTab}
        scrollEventThrottle={10}
        keyboardDismissMode={"on-drag"}
        pagingEnabled={true}
        getItemLayout={getItemLayout}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onScrollEnd}
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