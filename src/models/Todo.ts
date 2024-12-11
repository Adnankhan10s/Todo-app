import mongoose,{Document} from "mongoose";

interface Todo extends Document{
    title:string,
    description:string,
    createdAt:Date,
}

const todoSchema = new mongoose.Schema<Todo>({
    title:{type:String , required:true},
    description:{type:String , required:true},
    createdAt:{type:Date , default:Date.now()},
})
export const Todo = mongoose.models.Todo || mongoose.model("Todo",todoSchema);