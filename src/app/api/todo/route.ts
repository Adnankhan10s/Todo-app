import { DbConnect } from "@/libs/dbConfig";
import { Todo } from "@/models/Todo";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest) {
      try {
        const body = await req.json();
        await DbConnect();
        const todo =  new Todo(body);
        await todo.save();
        console.log(todo);
        return NextResponse.json({message:"Todo Created"},{status:201})

      } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Error Creating Todo"},{status:302})
      }
}

export async function GET(req:NextRequest) {
    try {
        await DbConnect();
        const todos= await Todo.find({});
        return NextResponse.json(todos,{status:200})
    } catch (error) {
        return NextResponse.json({message:'Error While fetchig Data'},{status:400})
    }
}

