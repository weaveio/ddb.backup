/* eslint-env node */

exports.events = {
  
  "Records": [
    {
      "eventID": "1",
      "eventVersion": "1.0",
      "dynamodb": {
        "Keys": {
    		  "CnlUid": {
    			"S": "29d08025-8356-431f-89d8-33638713361d"
    		  },
    		  "Millis": {
    			"N": "1489968473839"
    		  }
    		},
        "NewImage": {
    		  "CnlUid": {
    			"S": "29d08025-8356-431f-89d8-33638713361d"
    		  },
    		  "Data": {
    			"S": "{\"lines\":[{\"text\":\"lorem\",\"ts\":1482682788872},{\"text\":\"ipsum\",\"ts\":1482682814394}],\"attachments\":[]}"
    		  },
    		  "Likes": {
    			"M": {}
    		  },
    		  "Millis": {
    			"N": "1489968473839"
    		  },
    		  "OrgUid": {
    			"S": "30e00fc2-83ed-4721-be30-bdd0ba0cc597"
    		  },
    		  "Schema": {
    			"S": "text.json"
    		  },
    		  "SrcKind": {
    			"S": "weave.user"
    		  },
    		  "SrcUid": {
    			"S": "28b54f2c-af14-4173-9d14-9f863afdfd49"
    		  },
    		  "StatusKey": {
    			"S": "A"
    		  },
    		  "Uid": {
    			"S": "yUNHv3dFFGg3bwJ9gjBWAmjGLW7p"
    		  },
    		  "Users": {
    			"SS": [
    			  "28b54f2c-af14-4173-9d14-9f863afdfd49",
    			  "4dc5ba0b-6835-4384-af11-e0fb8b88bfca",
    			  "6631fe1d-bcb9-491a-8048-193062e76f11",
    			  "7f555566-748f-4f23-8cf5-3cf97edac5d3",
    			  "dcf872ae-83ad-453f-9431-b25e53287cf7",
    			  "f31e0f43-26c9-40aa-bcda-967e9601f488"
    			]
    		  },
    		  "Value": {
    			"S": "zzz"
    		  }
        },
        "StreamViewType": "NEW_AND_OLD_IMAGES",
        "SequenceNumber": "111",
        "SizeBytes": 26
      },
      "awsRegion": "us-west-2",
      "eventName": "INSERT",
      "eventSourceARN": "arn:aws:dynamodb:us-west-2:account-id:table/ExampleTableWithStream/stream/2015-06-27T00:48:05.899",
      "eventSource": "aws:dynamodb"
    }
  ]
};


