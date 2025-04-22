// src/utils/MapHtmlTemplate.ts
export const getMapHtmlTemplate = (kakaoJsKey: string): string => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoJsKey}&libraries=services"></script>
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
