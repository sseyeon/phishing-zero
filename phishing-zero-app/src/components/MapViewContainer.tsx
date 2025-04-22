import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import axios from 'axios';
import {getMapHtmlTemplate} from "@/src/utils/MapHtmlTemplate";

const KAKAO_JS_KEY = Constants.expoConfig?.extra?.kakaoJsKey;

export default function MapViewContainer({ style }: { style?: any }) {
    const [loading, setLoading] = useState(true);
    const webViewRef = useRef(null);
    const htmlTemplate = getMapHtmlTemplate(Constants.expoConfig?.extra?.kakaoJsKey || '');

    const handleWebViewLoad = () => {
        axios.get('http://192.168.45.76:5001/api/dong')
            .then(res => {
                const filtered = res.data.filter(p => p.lat && p.lng && p.score > 0);
                setTimeout(() => {
                    webViewRef.current?.postMessage(JSON.stringify(filtered));
                    setLoading(false);
                }, 300);
            })
            .catch(err => {
                console.error('🔥 데이터 요청 실패:', err);
                setLoading(false);
            });
    };

    return (
        <View style={[styles.container, style]}>
    {loading && (
        <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#e63946" />
    </View>
    )}
    <WebView
        ref={webViewRef}
    originWhitelist={['*']}
    source={{ html: htmlTemplate }}
    javaScriptEnabled={true}
    onLoad={handleWebViewLoad}
    style={{ flex: 1 }}
    />
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
        // marginBottom: 16,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1,
    },
});
