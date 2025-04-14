from flask import Flask, jsonify, send_file
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# 📌 기존 행정동 데이터 불러오기
with open("./seoul_dong_damage_api_full.json", encoding="utf-8") as f:
    data = json.load(f)

@app.route("/api/dong", methods=["GET"])
def get_dong_data():
    return jsonify(data)

@app.route("/api/dong/<dong_name>", methods=["GET"])
def get_dong_detail(dong_name):
    dong = next((item for item in data if item["dongName"] == dong_name), None)
    if dong:
        return jsonify(dong)
    else:
        return jsonify({"error": "해당 행정동을 찾을 수 없습니다."}), 404

# ✅ Heatmap용 JSON 데이터 제공
@app.route("/api/heatmap", methods=["GET"])
def get_heatmap_data():
    heatmap_path = os.path.join("../heatmap", "output", "heatmap_data.json")
    with open(heatmap_path, encoding="utf-8") as f:
        heatmap_data = json.load(f)
    return jsonify(heatmap_data)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
