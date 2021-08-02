module.exports = {
    region: "oss-cn-hangzhou",
    accessKeyId: "LTAI5tPkwJVNU3EniRdGJB5k",
    accessKeySecret: "1EW0Rq7Gq8P2HAHkhD3bi3VCGaOYFP",
    bucket: "video-server-app",
    Action:"AssumeRole",
    roleArn: "acs:ram::1575771635034942:role/blog-admin",
    policy: JSON.stringify({
        "Version": "1",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "oss:*",
                "Resource": [
                    "acs:oss:*:*:video-server-app",
                    "acs:oss:*:*:video-server-app/*"
                ]
            }
        ]
    }),
    RoleSessionName:"kjsdka5353@546kjhd"
}