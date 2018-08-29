export default {
  s3: {
    REGION: "us-east-2",
    BUCKET: "stephen-wu-uploads"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://n7akfm2s21.execute-api.us-east-2.amazonaws.com/prod"
    //URL: "http://localhost:5000/api"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_Zv2rNd5UD",
    APP_CLIENT_ID: "4r6q45dhbpbvmvescuen54e53k",
    IDENTITY_POOL_ID: "us-east-2:eaf1add8-f007-4dd8-baba-6e12cda3c849"
  },
};
