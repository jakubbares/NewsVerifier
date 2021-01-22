from app import create_app
from flask import request
from app.resources.articles import Articles
from app.resources.resource import Analysis
app = create_app('config')
from flask_cors import CORS, cross_origin
CORS(app, resources={r"/*": {"origins": "http://www.elevenhacks.com*"}})


@app.after_request
def after_request(response):
    if request.referrer:
        ref = request.referrer.split('/')
        url = ref[0] + "//" + ref[2]
        response.headers['Access-Control-Allow-Origin'] = url
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, HEAD'
    return response

@app.route("/")
def hello():
    return "<h1 style='color:blue'>Hello There!</h1>"

@app.route('/analyze', methods=['GET'])
def analyze():
    return Analysis.test_ner()

@app.route('/test2', methods=['POST'])
def test2():
    return






if __name__ == '__main__':
    app.run(host=app.config['HOST'],
            port=app.config['PORT'],
            debug=app.config['DEBUG'])
