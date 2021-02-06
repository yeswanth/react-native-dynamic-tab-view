import React, { RefObject } from 'react';
import { FlatList, ColorValue } from 'react-native';
export interface DynamicTabViewScrollProps {
    selectedTab: Number;
    pressHeader: CallableFunction;
    headerBackgroundColor: ColorValue;
    headerActiveTextStyle: StyleSheet;
    headerTextStyle: StyleSheet;
    highlightStyle: StyleSheet;
    headerUnderlayColor: ColorValue;
    noHighlightStyle: StyleSheet;
    data: any;
    extraData: any;
    scrollHeaderRef: RefObject<FlatList>;
}
declare const DynamicTabViewScrollHeader: React.FC<DynamicTabViewScrollProps>;
export default DynamicTabViewScrollHeader;
