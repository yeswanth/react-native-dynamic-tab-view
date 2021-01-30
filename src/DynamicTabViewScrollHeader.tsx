import React, { RefObject } from 'react';
import { Animated, TouchableHighlight, Text, FlatList, View, StyleSheet, ColorValue } from 'react-native';
import PropTypes from 'prop-types';
export interface DynamicTabViewScrollProps {
	selectedTab: Number,
	pressHeader: CallableFunction,
	headerBackgroundColor: ColorValue,
	headerActiveTextStyle: StyleSheet,
	headerTextStyle: StyleSheet,
	highlightStyle: StyleSheet,
	headerUnderlayColor: ColorValue,
	noHighlightStyle: StyleSheet,
	data: any,
	extraData: any,
	scrollHeaderRef: RefObject<FlatList>
}
const DynamicTabViewScrollHeader: React.FC<DynamicTabViewScrollProps> = (props) => {
	const { selectedTab, headerBackgroundColor, headerActiveTextStyle, headerTextStyle, highlightStyle, headerUnderlayColor, noHighlightStyle, data, extraData, scrollHeaderRef, ...restProps } = props;
	const [translateValue, setTranslateValue] = React.useState(new Animated.Value(0));
	const [headerWidth, setHeaderWidth] = React.useState(0);

	const onPressHeader = (item, index) => {
		console.log(item)
		const tabWidth = headerWidth / data.length;
		Animated.spring(translateValue, {
			toValue: index * tabWidth,
			velocity: 10,
			useNativeDriver: true,
		}).start();
		props.pressHeader(index);
	};

	const renderHighlight = showHighlight => {
		if (showHighlight) {
			return (
				<Animated.View
					style={[styles.highlight, highlightStyle, {
						transform: [{ translateX: translateValue }]
					}]}
				/>

			);
		} else {
			return (
				<View
					style={[styles.noHighlight, noHighlightStyle]}
				/>
			);
		}
	};
	const renderTitle = ({ item, index }) => {
		let isTabActive = index === selectedTab;
		let fontWeight = isTabActive ? "bold" : "normal";
		return (
			<TouchableHighlight
				onPress={() => onPressHeader(item, index)}
				style={[
					styles.tabItemContainer,
					{ backgroundColor: headerBackgroundColor }
				]}
				underlayColor={"#00000033"}
			>
				<View>
					<Text
						style={[
							{ fontWeight: fontWeight },
							styles.tabItemText,
							isTabActive ? headerActiveTextStyle : headerTextStyle
						]}
					>
						{item["title"]}
					</Text>
					{renderHighlight(isTabActive)}
				</View>
			</TouchableHighlight>
		);
	};
	const _onLayoutEvent = (event) => {
		setHeaderWidth(event.nativeEvent.layout.width)
	}
	return (
		<FlatList
			horizontal
			onLayout={_onLayoutEvent}
			alwaysBounceHorizontal={false}
			bounces={false}
			showsHorizontalScrollIndicator={false}
			data={data}
			ref={scrollHeaderRef}
			extraData={extraData}
			renderItem={renderTitle}
			style={[
				styles.headerStyle,
				{ backgroundColor: headerBackgroundColor }
			]}
		/>
	);
};

const styles: any = StyleSheet.create({
	tabItemText: {
		color: "white"
	},
	tabItemContainer: {
		overflow: "hidden",
		backgroundColor: "#555555",
		padding: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	highlight: {
		backgroundColor: "white",
		paddingHorizontal: 10,
		paddingVertical: 2,
		marginTop: 5
	},
	noHighlight: {
		paddingHorizontal: 10,
		paddingVertical: 2,
		marginTop: 5
	}
});

export default DynamicTabViewScrollHeader;