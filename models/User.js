module.exports = function(mongoose) {
    const UserSchema = mongoose.Schema({
        email: {
            type: String
        },
        password: {
            type: String
        },
        contributionScore: {
            type: Number,
            default: 0
        }
    });
    return User = mongoose.model("User", UserSchema);
}
