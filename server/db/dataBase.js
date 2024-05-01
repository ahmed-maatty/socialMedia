import mongoose from "mongoose";

export default () => {
    try {
        mongoose.
            connect(process.env.DB_URI)
            .then(console.log("Connected To DB Success !"));
    } catch (error) {
        console.log("error Happend !" + error)
    }
};