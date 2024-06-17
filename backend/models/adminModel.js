import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.register = async function (username, password) {

    const exists = await this.findOne({ username });

    if (exists) {
        throw Error("Username already exists.")
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hash });

    return user;
}

userSchema.statics.login = async function (username, password) {
    
    const user = await this.findOne({ username });

    if (!user) {
        throw Error("Incorrect username.")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error ("Incorrect password.");
    }

    return user;
}

const adminModel = mongoose.model("pinoySingAdmin", userSchema)

export default adminModel;