#! /bin/bash
mongoimport --host mongo --db liquidity --collection users --type json --file ./data/user.json --jsonArray
mongoimport --host mongo --db liquidity --collection departments --type json --file ./data/department.json --jsonArray