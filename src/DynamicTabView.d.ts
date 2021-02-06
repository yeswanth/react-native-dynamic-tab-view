import React from 'react';
import { ColorValue } from 'react-native';
export interface DynamicTabProps {
    defaultIndex: Number;
    containerStyle: StyleSheet;
    headerContainerStyle: StyleSheet;
    headerBackgroundColor: ColorValue;
    headerTextStyle: StyleSheet;
    headerActiveTextStyle: StyleSheet;
    headerUnderlayColor: ColorValue;
    highlightStyle: StyleSheet;
    data: any;
    tabContainerStyle: StyleSheet;
    noHighlightStyle: StyleSheet;
    extraData: any;
    renderTab: CallableFunction;
    onChangeTab: CallableFunction;
}
declare const DynamicTabView: React.FC<DynamicTabProps>;
export default DynamicTabView;
