import pandas as pd
import folium
import json

# 피해 + 좌표 데이터 불러오기
df = pd.read_csv('../data/seoul_dong_with_damage.csv')
df['피해건수'] = df['피해건수'].fillna(0)
df['score'] = df['score'].fillna(0)

# 지도 생성
m = folium.Map(location=[37.5665, 126.9780], zoom_start=11)

# 서울특별시 GeoJSON만 필터링
with open('../data/HangJeongDong_20241001.geojson', 'r', encoding='utf-8') as f:
    geo_all = json.load(f)

seoul_features = [
    feat for feat in geo_all['features']
    if feat['properties']['sidonm'] == '서울특별시'
]

seoul_geo = {
    "type": "FeatureCollection",
    "features": seoul_features
}

# 색상 기준 함수
def get_color(score):
    if score > 5:
        return '#800026'
    elif score > 2:
        return '#BD0026'
    elif score > 1:
        return '#E31A1C'
    elif score > 0.5:
        return '#FC4E2A'
    elif score > 0.1:
        return '#FD8D3C'
    else:
        return '#FED976'

# GeoJSON 스타일 함수
def style_function(feature):
    dong = feature['properties']['adm_nm'].split()[-1]
    row = df[df['행정동_명'] == dong]
    score = row['score'].values[0] if not row.empty else 0
    return {
        'fillOpacity': 0.7,
        'weight': 0.5,
        'color': 'white',
        'fillColor': get_color(score)
    }

# GeoJson 추가 (툴팁, 팝업)
folium.GeoJson(
    seoul_geo,
    name='서울시 피해 위험도',
    style_function=style_function,
    tooltip=folium.GeoJsonTooltip(
        fields=["adm_nm"],
        aliases=["행정동 전체명:"],
        sticky=True,
        labels=True
    ),
    popup=folium.GeoJsonPopup(
        fields=["adm_nm"],
        aliases=["행정동 전체명:"],
        labels=False
    )
).add_to(m)

# 범례(legend) 추가
legend_html = '''
<div style="
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 170px;
    height: 180px;
    background-color: white;
    border:2px solid grey;
    z-index:9999;
    font-size:14px;
    padding: 10px;
    ">
<b>위험도 점수 범례</b><br>
<span style="background:#800026;width:20px;height:10px;display:inline-block;"></span> 5 이상<br>
<span style="background:#BD0026;width:20px;height:10px;display:inline-block;"></span> 2~5<br>
<span style="background:#E31A1C;width:20px;height:10px;display:inline-block;"></span> 1~2<br>
<span style="background:#FC4E2A;width:20px;height:10px;display:inline-block;"></span> 0.5~1<br>
<span style="background:#FD8D3C;width:20px;height:10px;display:inline-block;"></span> 0.1~0.5<br>
<span style="background:#FED976;width:20px;height:10px;display:inline-block;"></span> 0 이하
</div>
'''
m.get_root().html.add_child(folium.Element(legend_html))

# 저장
m.save('../output/seoul_damage_map_with_legend.html')
