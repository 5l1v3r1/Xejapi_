from flask import Flask, jsonify, request
import requests


app = Flask(__name__)

@app.route('/get-db', methods = ['POST', 'GET'])
def get_db():
    if request.method == 'POST':
        myobj = {'table_name': 'users'}
        res = requests.post(url='http://127.0.0.1:8000/api/getdata/get-db', json = myobj)
        return res.text 

    else:
        return 'not allowed method'


if __name__ == '__main__':
    app.run(port=3000, debug=True)
