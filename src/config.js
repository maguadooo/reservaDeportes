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
    USER_POOL_ID: "us-east-1_k9GbWFFyG",
    APP_CLIENT_ID: "4qak2ehjt262i5v53ds0nvmb8l",
    IDENTITY_POOL_ID: "us-east-1:9cff9ebf-1769-4ca0-9ab4-308ac4dedddf",
  },
};

export default config;
