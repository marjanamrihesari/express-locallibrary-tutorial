var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GenreSchema = Schema({
    name:{type:String, require:true, minlength:3,maxlength: 100}
});

//virtual url
GenreSchema
    .virtual('url')
    .get(function(){
        return '/catalog/genre/' + this._id;
    });

module.exports= mongoose.model('Genre',GenreSchema);