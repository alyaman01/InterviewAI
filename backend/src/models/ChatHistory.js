const mongoose = require("mongoose");

const ChatHistorySchema = new mongoose.Schema({
    interviewId:{type:mongoose.Schema.Types.ObjectId, ref:'Interview',required:true},
    role:{type:String, required:true, enum:['user', 'model']},
    message:{type:String, required:true},
    timeStamp:{type:Date, default:Date.now }
});

ChatHistorySchema.index({ interviewId:1, timeStamp:1 });
module.exports = mongoose.model('ChatHistory', ChatHistorySchema);