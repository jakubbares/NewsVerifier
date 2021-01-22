from flask import request
from flask_restful import Resource
import json

# http://marshmallow.readthedocs.org/en/latest/quickstart.html#declaring-schemas
#https://github.com/marshmallow-code/marshmallow-jsonapi




class Articles(Resource):
    @staticmethod
    def analyze():
        raw_dict = request.get_json(force=True)
        players = raw_dict['data']['player_instatids']
        query = Player.query.filter(Player.instatid.in_(players)).all()
        results = schema.dump(query, many=True).data
        return json.dumps(results, default=decimal_default)

    @staticmethod
    def getAllPlayersCalculated():
        query = CalculatedPlayers.query.all()
        results = calc_schema.dump(query, many=True).data
        return json.dumps(results, default=decimal_default)

