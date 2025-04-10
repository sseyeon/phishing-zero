import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';

export default function MapScreen() {
    const [heatmapPoints, setHeatmapPoints] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.45.101:5001/api/heatmap')
            .then(res => setHeatmapPoints(res.data))
            .catch(err => console.error('🔥 Heatmap API 요청 오류:', err));
    }, []);

    if (heatmapPoints.length === 0) {
        return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 37.5665,
                    longitude: 126.9780,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                <Heatmap
                    points={heatmapPoints}
                    radius={30}
                    opacity={0.7}
                    gradient={{
                        colors: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
                        startPoints: [0.1, 0.3, 0.5, 0.7, 0.9],
                        colorMapSize: 256,
                    }}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
});
