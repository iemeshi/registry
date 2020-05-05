const apps = require("../apps.json");
const AWS = require("aws-sdk");

const route53 = new AWS.Route53({ apiVersion: "2013-04-01" });

const update_records = async (HostedZoneId) => {
  const params = {
    HostedZoneId: HostedZoneId,
    ChangeBatch: {
      Changes: [],
      Comment: "Updated by iemeshi/registry",
    },
  };

  apps.forEach((app) => {
    const change = {
      Action: "UPSERT",
      ResourceRecordSet: {
        Name: `${app["サブドメイン"]}.iemeshi.jp`,
        ResourceRecords: [{ Value: app.CNAME }],
        TTL: 300,
        Type: "CNAME",
      },
    };
    params.ChangeBatch.Changes.push(change);
  });

  const update_result = await route53
    .changeResourceRecordSets(params)
    .promise();

  console.log(JSON.stringify(update_result, null, 2));
};

const delete_records = async (HostedZoneId) => {
  const listParams = {
    HostedZoneId: HostedZoneId,
  };
  const records = await route53.listResourceRecordSets(listParams).promise();

  const deleteParams = {
    HostedZoneId: HostedZoneId,
    ChangeBatch: {
      Changes: [],
      Comment: "Deleted by iemeshi/registry",
    },
  };
  const names = [];
  apps.forEach((app) => {
    names.push(`${app["サブドメイン"]}.iemeshi.jp`);
  });

  records.ResourceRecordSets.forEach((record) => {
    if ("CNAME" === record.Type) {
      if (-1 === names.indexOf(record.Name.replace(/\.$/, ""))) {
        const change = {
          Action: "DELETE",
          ResourceRecordSet: record,
        };
        deleteParams.ChangeBatch.Changes.push(change);
      }
    }
  });
  if (deleteParams.ChangeBatch.Changes.length) {
    const delete_result = await route53
      .changeResourceRecordSets(deleteParams)
      .promise();

    console.log(JSON.stringify(delete_result, null, 2));
  }
};

update_records(process.env.HOSTED_ZONE_ID);
delete_records(process.env.HOSTED_ZONE_ID);
