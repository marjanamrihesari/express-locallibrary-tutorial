//@ts-check
var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name:{type: String, required: true, max: 100},
    family_name:{type: String, required: true, max: 100},
    date_of_birth:{type:Date},
    date_of_death:{type:Date}
});

//virtual for author name
AuthorSchema
    .virtual('name')
    .get(function(){
        return `${this.family_name} , ${this.first_name}`
    });

//virutal for author url
AuthorSchema
    .virtual('url')
    .get(function(){
        return '/catalog/author/' + this._id;
        
    });

AuthorSchema
    .virtual('date_birth_formatted')
    .get(function(){
        return moment(this.date_of_death).format('MMMM Do,YYYY');
    });

AuthorSchema
    .virtual('date_death_formatted')
    .get(function(){
        return  moment(this.date_of_death).format('MMMM Do,YYYY');
    });

AuthorSchema
    .virtual('lifespan')
    .get(function(){
        const birth = moment(this.date_of_birth).format('MMMM Do,YYYY') ;
        const death = moment(this.date_of_death).format('MMMM Do,YYYY');
        return `${birth} - ${death}`;
    });
   
module.exports = mongoose.model('Author',AuthorSchema);