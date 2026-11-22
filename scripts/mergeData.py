import json

def load_json(filename):
    with open(filename, "r") as file:
        return json.load(file)
players = load_json('../seeder/data/players.json')
player_data = load_json('../seeder/data/player-data.json')
data = []
for pd in player_data:
    pd.update(players[pd['id']])
    del pd['endYear']
    del pd['startYear']
    data.append(pd)
    
with open("../seeder/data/all-data.json", "w") as file:
    json.dump(data, file, indent=2)