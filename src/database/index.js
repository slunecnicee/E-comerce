import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://mkiknavelidze2001:wadisheni123@cluster0.nxdhmxb.mongodb.net/ecomerce";

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Ecommerce database connected successfully!"))
    .catch((err) => console.log(`Error from DB connection ${err.message}`));
};

export default connectToDB;
