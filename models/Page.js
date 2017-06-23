module.exports = function(mongoose) {
    const PageSchema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        pageurl: {
            type: String,
            required: true
        },
        links: {
            type: [String],
            default: []
        },
        searchables: {
            type: [String],
            default: []
        },
        pagescore: {
            type: Number
        }
    });
    return Page = mongoose.model("Page", PageSchema);
}
