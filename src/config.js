const config = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME",
  },
  apiGateway: {
    REGION: "YOUR_API_GATEWAY_REGION",
    URL: "YOUR_API_GATEWAY_URL",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_25KDuPaxO",
    APP_CLIENT_ID: "4f9kmo45mtf9hqklu9i9o811ka",
    IDENTITY_POOL_ID: "4f9kmo45mtf9hqklu9i9o811ka",
  },
};

export default config;
