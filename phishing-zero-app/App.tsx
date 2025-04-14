import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// 아이콘
import { Ionicons } from '@expo/vector-icons';

// 화면들
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from './src/screens/MapScreen';
import ReportScreen from './src/screens/ReportScreen';
import LookupScreen from './src/screens/LookupScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) =>({
                    headerShown: false,
                    tabBarActiveTintColor: '#C32F391',
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        switch (route.name) {
                            case '홈':
                                iconName = 'home';
                                break;
                            case '피해리포트':
                                iconName = 'analytics';
                                break;
                            case '위험지도':
                                iconName = 'map';
                                break;
                            case '조회':
                                iconName = 'search';
                                break;
                            case '설정':
                                iconName = 'settings';
                                break;
                            default:
                                iconName = 'ellipse';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="홈" component={HomeScreen} />
                <Tab.Screen name="피해리포트" component={ReportScreen} />
                <Tab.Screen name="위험지도" component={MapScreen} />
                <Tab.Screen name="조회" component={LookupScreen} />
                <Tab.Screen name="설정" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
