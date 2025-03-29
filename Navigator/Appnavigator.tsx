// Navigator/Appnavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from '../Screens/Homescreen';
import Savejobscreen from '../Screens/Savejobscreen';
import Applicationformscreen from '../Screens/Applicationformscreen';

export type RootStackParamList = {
    Main: undefined;
    ApplicationForm: { job: any }; // Ensure job data is passed
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const MainTabs = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Homescreen} />
        <Tab.Screen name="Saved Jobs" component={Savejobscreen} />
    </Tab.Navigator>
);

const Appnavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={MainTabs} />
                <Stack.Screen name="ApplicationForm" component={Applicationformscreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Appnavigator;
