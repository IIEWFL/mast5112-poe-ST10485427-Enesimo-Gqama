[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/I98JERYe)

YouTube Link: 
https://youtu.be/yW8e6eXJqx4?si=uoStJ_jd-6ZZo7eM

Explanation of the Code

This project is a Chef Menu App built using React Native with TypeScript. It is designed from two perspectives — Chef and Guest. The Chef can add and edit menu items, while the Guest can view and filter dishes by course (like starters, mains, and desserts).
Purpose of the App
The app makes it easy for a restaurant or chef to manage a menu and for guests to browse it. It helps keep the menu dynamic, as the Chef can update items without hardcoding any data.

Key Features

1. Guest View 
Browse all available dishes.
Filter dishes by course (Appetizer, Main, Dessert, Side, Drink).
View average price per course.
View full dish details including name, price, description, and image.
NEW: Guest Filter Screen allowing multi-course filtering.

2. Chef Manage Screen
Add new dishes.
Edit existing dishes.
Upload/select images for each dish.
Delete dishes.
All changes automatically saved to device storage.

3. Chef Kitchen Screen
Quick-edit version of the Chef Manage Screen.
Allows staff to quickly update dish names or prices.
Falls back to full Chef Manage screen when prompt editing isn’t supported.

4. Course Selection Screen
Guest chooses a course to filter the main menu.
Used internally by Guest View.

5. Dish Details Screen
Shows all info for a dish including image.
Clean layout, large text, and easy navigation.

6. Data Storage
Dishes persist between app launches using AsyncStorage.

Includes a testing button to clear all data.
How the App Works
•	When the app opens, it loads the menu data stored on the device.
•	The Chef Screen allows the user to add or edit dishes. When the Chef saves changes, the data is updated in storage.
•	The Menu Screen shows all dishes in a simple list. Guests can use filters to see only a specific type of dish.
•	The Navigation system makes it easy to move between screens, like going from the menu list to a detailed dish view or to the Chef management section.

Handling the Safe Area Warning
React Native has a feature called Safe Area, which ensures that the app’s content doesn’t overlap with areas like the phone’s notch, time, or home indicator.
Previously, the app used a built-in SafeAreaView from React Native, but it is now outdated.
To fix the warning, the code uses a new version from a library called react-native-safe-area-context. This ensures that all screens look correct on modern phones.
The new setup looks like this:
•	The app wraps everything inside a SafeAreaProvider, which manages safe areas automatically.
•	Each screen uses SafeAreaView from the new library instead of the old one.

Changelog

 Initial Release
 - Base project created with Expo + TypeScript
 - App structure set up with Guest, Chef Manage, and Chef Kitchen screens
 - AsyncStorage integrated for dish persistence
 - Basic components: MenuItemCard, dish model, price formatting

Course Filtering + Dish Details

- Added CourseSelectionScreen
- Added DishDetailsScreen
- Updated GuestMenuScreen to support course selection
- Added navigation states course_select and dish_details
- Improved MenuItemCard layout

Image Support

- Dish type updated to include image?: string | number
- Added image upload support in ChefManageScreen
- Added image display to DishDetailsScreen and MenuItemCard

Average Price Feature

- Added automatic calculation of average price per course
- Displayed average price inside GuestMenuScreen under course filters

Guest Filter Screen (Multi-Course Filtering)

- Added GuestFilterScreen.tsx
- Added chips/toggles for selecting multiple courses
- Added dynamic filtered list of dishes
- Integrated new navigation state: guest_filter
- Updated App.tsx to include filter navigation button
- Selecting filtered dishes opens Dish Details
- Includes summary of active filters

Summary
In short, this app:
•	Let’s a Chef manage a menu (add/edit dishes).
•	Let’s Guests view and filter dishes.
•	Keeps menu data saved locally, so it’s not lost.
•	Uses safe-area handling for modern devices.
•	Has simple and clear navigation between screens.
The main goal is to provide a user-friendly experience for both roles, ensuring the app is functional, dynamic, and visually organized without needing internet access or a backend system.
