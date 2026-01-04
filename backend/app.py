from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

PRICE_FILE = os.path.join(os.path.dirname(__file__), 'prices.json')

def load_prices():
    if os.path.exists(PRICE_FILE):
        with open(PRICE_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_prices(data):
    with open(PRICE_FILE, 'w') as f:
        json.dump(data, f)

@app.route('/api/prices', methods=['GET'])
def get_prices():
    return jsonify(load_prices())

@app.route('/api/update', methods=['POST'])
def update_prices():
    data = request.json
    prices = load_prices()
    prices.update(data)
    save_prices(prices)
    return jsonify({"message": "Prices updated successfully"})

if __name__ == '__main__':
    app.run(debug=True)
