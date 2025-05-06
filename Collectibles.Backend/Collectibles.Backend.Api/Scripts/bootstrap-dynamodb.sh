#!/bin/bash

# DynamoDB local endpoint
ENDPOINT="http://localhost:8000"

echo "Launching DynamoDB container..."
docker run -d -p 8000:8000 --name dynamodb-local amazon/dynamodb-local 
sleep 4

echo "Creating tables..."

aws dynamodb create-table \
  --table-name User \
  --attribute-definitions AttributeName=id,AttributeType=S AttributeName=email,AttributeType=S\
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --global-secondary-indexes '[
      {
        "IndexName": "EmailIndex",
        "KeySchema": [
          {
            "AttributeName": "email",
            "KeyType": "HASH"
          }
        ],
        "Projection": {
          "ProjectionType": "ALL"
        },
        "ProvisionedThroughput": {
          "ReadCapacityUnits": 1,
          "WriteCapacityUnits": 1
        }
      }
    ]' \
  --endpoint-url http://localhost:8000

aws dynamodb create-table \
  --table-name Collection \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --endpoint-url $ENDPOINT

aws dynamodb create-table \
  --table-name Collectible \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=collectibleId,AttributeType=S \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=collectibleId,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --endpoint-url $ENDPOINT

aws dynamodb create-table \
  --table-name Refresh \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=tokenId,AttributeType=S \
    AttributeName=token,AttributeType=S \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=tokenId,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --global-secondary-indexes '[
      {
        "IndexName": "TokenIndex",
        "KeySchema": [
          {
            "AttributeName": "token",
            "KeyType": "HASH"
          }
        ],
        "Projection": {
          "ProjectionType": "ALL"
        },
        "ProvisionedThroughput": {
          "ReadCapacityUnits": 1,
          "WriteCapacityUnits": 1
        }
      }
    ]' \
  --endpoint-url http://localhost:8000
  
echo "Waiting for tables to become active..."
sleep 4

echo "Seeding data..."

# Seed Collection
aws dynamodb put-item \
  --table-name Collection \
  --item '{
    "id": { "S": "capetown" },
    "name": { "S": "Cape Town" },
    "country": { "S": "South Africa" },
    "categories": {
      "L": [
        {
          "M": {
            "id": { "S": "capetown-beaches" },
            "name": { "S": "Beaches" },
            "type": { "S": "IconicPlaces" },
            "collectibles": {
              "L": [
                {
                  "M": {
                    "id": { "S": "capetown-beaches-muizenburg" },
                    "name": { "S": "Muizenburg" },
                    "clue": { "S": "Head towards silvermine." },
                    "bonus": {
                      "M": {
                        "description": { "S": "Take a swim while you are there." },
                        "question": { "S": "Did you take a swim?" }
                      }
                    },
                    "pixelArtFilename": { "S": "muizenburg.png" }
                  }
                }
              ]
            }
          }
        }
      ]
    }
  }' \
  --endpoint-url $ENDPOINT

echo "✅ All tables and seed data created."
