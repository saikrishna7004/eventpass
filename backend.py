from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId
import os
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

load_dotenv()

mongo_uri = os.environ.get('MONGODB_URI')

app.config['MONGO_URI'] = mongo_uri
mongo = PyMongo(app)

@app.route('/users/', methods=['POST'])
def get_user_roll_number():
    try:
        user_id = request.get_json()['data']
        user = mongo.db.netras.find_one({'netra': int(user_id)})
        if user:
            roll_number = user.get('rollno', 'Unknown')
            return jsonify({'status': 'success', 'roll_number': roll_number})
        else:
            return jsonify({'status': 'error', 'message': 'User not found', 'roll_number': "Unknown"})

    except Exception as e:
        print("Error", e)
        return jsonify({'status': 'error', 'message': str(e), 'roll_number': "Unknown"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
