import Constants from 'expo-constants';
import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const KAKAO_JS_KEY = Constants.expoConfig?.extra?.kakaoJsKey;

const MapScreen = () => {
    const [htmlReady, setHtmlReady] = useState(false);
    const [dongData, setDongData] = useState([]);
    const [loading, setLoading] = useState(true);
    const webViewRef = useRef(null);

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&libraries=services"></script>
      <style> html, body, #map { margin: 0; padding: 0; height: 100%; } </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = new kakao.maps.Map(document.getElementById('map'), {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 6
        });

        const getColorByScore = (score) => {
          if (score >= 300) return '#FF4D4F';
          if (score >= 200) return '#FA8C16';
          if (score >= 100) return '#FADB14';
          return '#52C41A';
        };

        const handleMessage = function(event) {
          try {
            const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            if (!Array.isArray(data)) return;

            data.forEach(item => {
              const center = new kakao.maps.LatLng(item.lat, item.lng);

              const circle = new kakao.maps.Circle({
                center: center,
                radius: Math.floor(item.caseCount),
                strokeWeight: 0,
                fillColor: getColorByScore(Math.floor(item.caseCount)),
                fillOpacity: 0.4
              });
              circle.setMap(map);

              const infowindow = new kakao.maps.InfoWindow({
                content: '<div style="padding:5px; font-size:13px;"><strong>' + item["dongName"] + '</strong><br/>발생 건수: ' + item.caseCount.toFixed(1) + '</div>'
              });
              kakao.maps.event.addListener(circle, 'click', function () {
                infowindow.setPosition(center);
                infowindow.open(map);
              });

              const label = new kakao.maps.CustomOverlay({
                position: center,
                content: '<div style="color: white; font-size: 14px; font-weight: bold; text-align: center; transform: translate(-50%, -50%); white-space: nowrap;">' +
                         item.caseCount.toFixed(0) + '</div>',
                yAnchor: 0,
                xAnchor: 0,
              });
              label.setMap(map);
            });
          } catch (e) {
            console.error('🔥 메시지 처리 오류:', e);
          }
        };

        window.addEventListener('message', handleMessage);
        document.addEventListener('message', handleMessage);
      </script>
    </body>
    </html>
  `;

    // ✅ WebView 로드 완료 → 데이터 요청 → postMessage()
    const handleWebViewLoad = () => {
        axios.get('http://192.168.45.76:5001/api/dong')
            .then(res => {
                const filtered = res.data.filter(p => p.lat && p.lng && p.score > 0);
                setDongData(filtered);
                setTimeout(() => {
                    console.log("📤 데이터 전송 중:", filtered.length);
                    webViewRef.current?.postMessage(JSON.stringify(filtered));
                    setLoading(false);
                }, 300); // 약간의 렌더링 안정 대기
            })
            .catch(err => {
                console.error('🔥 데이터 요청 실패:', err);
                setLoading(false);
            });
    };

    if (!htmlReady) {
        setHtmlReady(true); // 최초 1회 실행
        return (
            <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                source={{ html: htmlTemplate }}
                javaScriptEnabled={true}
                onLoad={handleWebViewLoad}
                style={{ flex: 1 }}
            />
        );
    }

    return (
        <View style={{ flex: 1 }}>
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
};

export default MapScreen;
