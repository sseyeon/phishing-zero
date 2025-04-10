import pandas as pd
import json

# CSV 불러오기
df = pd.read_csv('../data/seoul_dong_with_damage.csv')
df = df.fillna(0)

# 필요한 컬럼만 추출 & weight 컬럼 매핑
heatmap_data = df[['lat', 'lng', 'score']].rename(columns={
    'lat': 'latitude',
    'lng': 'longitude',
    'score': 'weight'
})

# JSON 저장
heatmap_data.to_json('../output/heatmap_data.json', orient='records', force_ascii=False)
print("✅ heatmap_data.json 저장 완료")
