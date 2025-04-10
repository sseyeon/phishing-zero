import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 화면들
import MapScreen from './src/screens/MapScreen';
import ReportScreen from './src/screens/ReportScreen';
import LookupScreen from './src/screens/LookupScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#e63946',
                }}
            >
                <Tab.Screen name="위험지도" component={MapScreen} />
                <Tab.Screen name="피해리포트" component={ReportScreen} />
                <Tab.Screen name="조회" component={LookupScreen} />
                <Tab.Screen name="설정" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
