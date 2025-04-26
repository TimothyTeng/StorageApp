from flask import Flask, jsonify, request
import json
import sqlite3
import time

app = Flask(__name__)

@app.route('/addlayout', methods=["GET", "POST"])
def add_layout():
    if request.method == "POST":
        req = request.get_json()
        GridStr = json.dumps(req["Grid"])
        Name = req["Name"]
        db = sqlite3.connect("storage.db")
        query = f"""
        INSERT INTO Layout (LocationID, Name, Grid)
        VALUES (?,?,?)
        """
        db.execute(query, (1,Name, GridStr))
        db.commit()
        db.close()
        return jsonify({'State': "Success"})

@app.route('/getdata', methods=["GET", "POST"])
def get_data():
    if request.method == "POST":
        req = request.get_json()
        LocationID = req["LocationID"]
        db = sqlite3.connect("storage.db")
        query = """
        SELECT * FROM Layout
        WHERE LocationID = ?
        """
        cursor = db.execute(query, (LocationID,))
        result = cursor.fetchall()
        cursor.close()
        db.close()
        return jsonify(result)