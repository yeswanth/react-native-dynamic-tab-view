import React from 'react';
import {
  View,
  Dimensions,
  FlatList,
  StyleSheet,
  ColorValue,
} from 'react-native';
import DynamicTabViewScrollHeader from './DynamicTabViewScrollHeader';
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
  const [selectedIndex, setSelectedIndex] = React.useState(props.defaultIndex ? props.defaultIndex : 0);
  const [containerWidth, setContainerWidth] = React.useState(Dimensions.get("window").width);
  const viewConfigRef = React.useRef({
    itemVisiblePercentThreshold: 90,
    minimumViewTime: 100
  })

  const flatListRef = React.useRef(null);
  const scrollHeaderRef = React.useRef(null);

  const getItemLayout = (data, index) => ({
    length: containerWidth,
    offset: containerWidth * index,
    index
  });

  const pressHeader = (index) => {
    flatListRef?.current?.scrollToIndex({ index });
    changeHeaderScrollPosition(index)
  }
  const changeHeaderScrollPosition = (index) => {
    scrollHeaderRef?.current?.scrollToIndex({ animated: true, index });
  }

  const onViewRef = React.useRef(({ viewableItems, changed }) => {
    if (viewableItems && viewableItems.length > 0) {
      setSelectedIndex(viewableItems[0].index)
      changeHeaderScrollPosition(viewableItems[0].index)
      if (props.onChangeTab) {
        props.onChangeTab(viewableItems[0].index);
      }
    }
  })


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
          pressHeader={pressHeader}
          scrollHeaderRef={scrollHeaderRef}
          selectedTab={selectedIndex}
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
        keyExtractor={(item, index) => index.toString()}
        ref={flatListRef}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={RenderTab}
        scrollEventThrottle={10}
        keyboardDismissMode={"on-drag"}
        pagingEnabled={true}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
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
});

export default DynamicTabView;