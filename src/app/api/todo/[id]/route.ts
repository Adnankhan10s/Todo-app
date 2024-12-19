import { DbConnect } from "@/libs/dbConfig";
import { Todo } from "@/models/Todo";
import {  NextResponse } from "next/server";




export async function PUT (req:Request, context: { params: { id: string } }) {
  await DbConnect();
  const {id} =  context.params;
  const {title , description} = await req.json();
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id,
      { title, description},
      { new: true }  );
    return NextResponse.json(updatedTodo,{status:201})
  } catch (error) {
     return NextResponse.json({message:"Failed to update"},{status:402})
  }
  
}
export async function GET(req:Request ,  context: { params: { id: string } }) {
  try {
    const {id} = context.params;
    await DbConnect();
    const todo = await Todo.findById(id);
    
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching todo" }, { status: 500 });
  }
}
export async function DELETE(req:Request, context: { params: { id: string } }) {
  await DbConnect();
  const {id} = context.params
  try {
    await Todo.findByIdAndDelete(id)
    return NextResponse.json({message:"Deleted successfully"},{status:201})
  } catch (error) {
    return NextResponse.json({message:"Error While Deleting"},{status:400})
  }
  
}


  
  
