'use strict';

const aws = require('aws-sdk');

exports.handler = (event, context, callback) => {
    const csd = new aws.CloudSearchDomain({endpoint: 'doc-prod-messages-20170321-4vj2yy3xj2xtvvk7voyron5bbm.us-east-1.cloudsearch.amazonaws.com'});
    console.log(`Loading  ${event.Records.length} documents.`);
    const documents = event.Records.map((record) => {
        const ddb = record.dynamodb;
        const data = {id : ddb.Keys.CnlUid.S + '+' + ddb.Keys.Millis.S};
        if (record.eventName === 'REMOVE') {
            data.type = 'delete'
        } else {
            data.type = 'add'
            const image = ddb.NewImage;
            data.fields = {
    		  orguid:  image.OrgUid.S,
    		  cnluid:  image.CnlUid.S,
    		  millis:  image.Millis.S,
    		  srcuid:  image.SrcUid.S,
    		  srckind: image.SrcKind.S,
    		  title:   image.Value.S,
    		  tags:    (image.Tags || {}).SS || [],
            };
            try {
              const parsed = JSON.parse(image.Data.S)
              data.fields.text = (parsed.lines && parsed.lines.map(function(x){return x.text})) || [parsed.body || '-']
            } catch (e) {
                console.log('Error parsing JSON data', e)
            }
        }
        return data;
    });
    const params = {contentType: 'application/json', documents: JSON.stringify(documents) };
    csd.uploadDocuments(params, (err, data) => {
        if(err) callback(err, err.stack);
        else callback(null, `Successfully processed ${event.Records.length} records.`);
    });
};
