## Features 
- Easy to use and easy to read code
- No code difference between and Android and iOS 
- FlatList instead of scrollViews to build tabs 

### Usecases 
- Dynamic tab data that is updated after an API call 
- Non-zero default tab support 

## How to use
Simply `yarn install @walkin-frontend/react-native-dynamic-tab-view`

## FAQs

### Why are you building another TabView library? 
At present, there are two tabView libraries that are out there 
* `react-native-scrollable-tab-view`
* `react-native-tab-view`
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

### What's missing in v0.1.0?
- TabView content scroll has been disabled (till I add support for the header scrolling smoothly with that of the body)
- Animations and positing of headers 


