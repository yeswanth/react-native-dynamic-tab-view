[![npm version](https://badge.fury.io/js/react-native-dynamic-tab-view.svg)](https://badge.fury.io/js/react-native-dynamic-tab-view)

## Features 
- Easy to use and easy to read code
- React-Native Javascript library built on top of `FlatList`.

### Usecases 
- Dynamic tab data that can be populated by code (typically tabs are determined by an API call) 
- Ability to select any index (and just the zeroth index) as the default index. 

## How to use
Simply install by running `yarn add react-native-dynamic-tab-view`

Use it by 

```
import DynamicTabView from 'react-native-dynamic-tab-view';
 <DynamicTabView
        data={dataSource}
        renderTab={renderTab}
        onChangeTab={onChangeTab}
        defaultIndex={defaultIndex}
        containerStyle={styles.container}
        headerBackgroundColor={'white'}
        headerUnderlayColor={'blue'}
      />
```

Here `data` is of the format

```
[
   { title: 'Tab1', key: 'item1' },
   { title: 'Tab2', key: 'item2' },
   { title: 'Tab3', key: 'item3' },
]
```
`title` sets the tab title 
`key` is used internally by React. It can be any unique string

### Important Props 
* **data** data to tell the number of tabs and set the layout
* **renderTab** method to render individual tab. It should return a valid React Component 
* **onChangeTab** callback that will be invoked when a user changes tab 
* **defaultIndex** index of the tab that will be selected by default. 
* **containerStyle** style for the dynamic tab view container 
* **headerBackgroundColor** background color for header 
* **headerUnderlayColor** Color for header underlay
* **headerTextStyle** style for header text
* **swipeToPage** Enable the swipe gesture for moving between tabs.  Default true.

### Run the Example project
1. `cd Example`
2. `npm install`
3. `react-native run-android` or `react-native run-ios`


or try expo: [Dynamic Tab View Example](https://snack.expo.io/@har2008preet/vigorous-apples)

## FAQs

### Why are you building another TabView library? 
At present, there are two tabView libraries that are out there 
* [react-native-scrollable-tab-view](https://www.google.com/search?q=react-native-scrollable-tab-view)
* [react-native-tab-view](https://github.com/react-native-community/react-native-tab-view)
I have used both of them and I had multitude of issues with them. 
* `react-native-scrollable-tab-view` 
  - Doesn't have proper maintainence. Last update was back in October. There are lot of open PRs. 
  - Code is bloated and I tried fixing issues, but couldn't navigate my way through 
  - Uses different code for Android and iOS and therefore I had issues like some view works with Android well and not with iOS and viceverca 
* `react-native-tab-view`
  - Uses different code for Android and iOS
  - Couldn't get default page selected working with this. 
  - Built and works well for static views (dynamic tabs doesn't work very well with Android)
  
  
### How's react-native-dynamic-tab-view different?
- Uses same code for Android and iOS 
- More importantly, uses FlatList for creating the tabViews 
- Easy to read code 

### Contributors 
* [@yeswanth](https://github.com/yeswanth)
* [@priyathamv](https://github.com/priyathamv)
* [@indupal](https://github.com/indupal)
* [@har2008preet](https://github.com/har2008preet) - Expo Example
