a fork of https://github.com/yeswanth/react-native-dynamic-tab-view 

## Features 
- Easy to use and easy to read code
- React-Native Javascript library built on top of `FlatList`.

### Usecases 
- Dynamic tab data that can be populated by code (typically tabs are determined by an API call) 
- Ability to select any index (and just the zeroth index) as the default index. 


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

### Run the Example project
1. `cd Example`
2. `npm install`
3. `react-native run-android` or `react-native run-ios`
