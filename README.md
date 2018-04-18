## Features 
- Easy to use and easy to read code
- No code difference between and Android and iOS 
- FlatList instead of scrollViews to build tabs 

### Usecases 
- Dynamic tab data that is updated after an API call 
- Non-zero default tab support 

### Yet to come
- TabView content scroll has been disabled (till I add support for the header scrolling smoothly with that of the body)
- Animations and positing of headers 

## How to use
Simply install by running `yarn install @walkin-frontend/react-native-dynamic-tab-view`

Use it by 

```
import DynamicTabView from '@walkin-frontend/react-native-dynamic-tab-view';
 <DynamicTabView
        data={dataSource}
        renderTab={renderTab}
        onChangeTab={onChangeTab}
        defaultIndex={defaultIndex}
        containerStyle={styles.container}
        headerContainerStyle={styles.headerContainer}
        tabItemContainerStyle={styles.tabItemContainer}
      />
```

Here `data` is of the format

```
[
   { title: 'Tab1', key: 'item1', color: 'blue' },
   { title: 'Tab2', key: 'item2', 'color': 'yellow' },
   { title: 'Tab3', key: 'item3', 'color': 'brown' },

]
```

### Important Props 
* **data** telling the view what to render.
* **renderTab** method to render individual tab. It should return a valid React Component 
* **onChangeTab** callback that will be invoked when a user changes tab 
* **defaultIndex** index of the tab that will be selected by default. 
     

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




