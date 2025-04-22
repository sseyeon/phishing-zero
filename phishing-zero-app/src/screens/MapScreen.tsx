import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapViewContainer from "@/src/components/MapViewContainer";


const MapScreen = () => {

    return (
        <View style={{ flex: 1 }}>
            <MapViewContainer style={{ flex: 1 }} />
        </View>
    );
};

export default MapScreen;
