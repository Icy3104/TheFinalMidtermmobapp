import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from '../Screens/Homescreen';
import Savejobscreen from '../Screens/Savejobscreen';
import Applicationformscreen from '../Screens/Applicationformscreen';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons

export type RootStackParamList = {
    Main: undefined;
    ApplicationForm: { job: any }; // Ensure job data is passed
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const MainTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home-outline';
                } else if (route.name === 'Saved Jobs') {
                    iconName = 'bookmark-outline'; // Changed icon
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007bff', // Highlight color
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' }, // Increased font size
        })}
    >
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
