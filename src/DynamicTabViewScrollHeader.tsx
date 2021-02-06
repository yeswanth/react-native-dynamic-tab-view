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
	const tabWidth = headerWidth / data.length;
	const onPressHeader = (item, index) => {
		console.log(index)
		props.pressHeader(index);
		Animated.spring(translateValue, {
			toValue: index * tabWidth,
			velocity: 10,
			useNativeDriver: true,
		}).start();

	};

	const renderTitle = ({ item, index }) => {
		let isTabActive = index === selectedTab;
		let fontWeight = isTabActive ? "bold" : "normal";
		return (
			<View>


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
					</View>
				</TouchableHighlight>
			</View>

		);
	};
	const _onLayoutEvent = (event) => {
		setHeaderWidth(event.nativeEvent.layout.width)
	}
	return (
		<View style={styles.contentContainer}>
			<View style={styles.animateContainer}>
				<Animated.View
					style={[
						styles.slider,
						{
							transform: [{ translateX: translateValue }],
							width: 40,
						},
					]}
				/>
			</View>

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
		</View>

	);
};

const styles: any = StyleSheet.create({
	headerContainer: {
		height: 80
	},
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
	},
	slider: {
		height: 5,
		paddingHorizontal: 10,
		paddingVertical: 2,
		position: 'absolute',
		top: 50,
		backgroundColor: 'white',
		borderRadius: 10
	},
	animateContainer: {
		zIndex: 5,
	}
});

export default DynamicTabViewScrollHeader;