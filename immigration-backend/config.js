var config = {};

////////////////////////////////////////////////////////////////////
process.env.NODE_ENV = "dev";
////////////////////////////////////////////////////////////////////

config.dev = {
    db: 'mongodb://localhost:27017/immigration_tool',
    //db:`mongodb+srv://sample_user:<password>@my-sample-cluster-b3ugy.mongodb.net/<dbname>?retryWrites=true&w=majority`
    //db:"mongodb+srv://balademo.nrmie.mongodb.net/myFirstDatabase",
    host: "https://immigration.hindujatech.com:3000/",
    node_port: 8000,
    browser_sync_port: 3001,
};

module.exports = config;