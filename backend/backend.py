from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)


db_config = {
    'user': 'root', 
    'password': 'root', 
    'host': 'localhost',
    'database': 'notepad'
}

def get_db_connection():
    
    return pymysql.connect(
        host=db_config["host"],
        user=db_config["user"],
        password=db_config["password"],
        database=db_config["database"]
    )

@app.route('/save-note', methods=['POST'])
def save_note():
    data = request.get_json()
    content = data.get('content', '')
    if not content:
        return jsonify({'error': 'No content'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO notes (content) VALUES (%s)", (content,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Note saved successfully'}), 200

@app.route('/notes', methods=['GET'])
def fetch_notes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, content, created_at FROM notes ORDER BY created_at DESC")
    notes = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(notes)

if __name__ == '__main__':
    app.run(debug=True)
