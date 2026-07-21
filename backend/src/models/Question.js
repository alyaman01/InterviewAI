const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    technology:{
        type:String,
        required:true,
        enum:["Node.js", "React", "Express", "MERN", "HR"],
    },
    experienceLevel:{
        type:String,
        required:true,
        enum:["Beginner", "Intermediate", "Experienced"],
    },
    questionText:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

});

QuestionSchema.index({technology:1, experienceLevel:1 });

module.exports = mongoose.model("Question", QuestionSchema);