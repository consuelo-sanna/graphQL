var admin = require("firebase-admin");

// var serviceAccount = require("../config/fbServiceAccountKey.json");

console.log("test env ", process.env.FIREBASE_TYPE);

var serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //   databaseURL: "https://mern-gql.firebaseio.com",
});

exports.authCheck = async (req) => {
  try {
    const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    console.log("CURRENT USER", currentUser);
    return currentUser;
  } catch (error) {
    console.log("AUTH CHECK ERROR", error);
    throw new Error("Invalid or expired token");
  }
};

exports.authCheckMiddleware = (req, res, next) => {
  if (req.headers.authtoken) {
    admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then((result) => {
        next();
      })
      .catch((error) => console.log(error));
  } else {
    res.json({ error: "Unauthorized" });
  }
};
