import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import CommentModel from "@/models/CommentModel";

type ResponseData = {
  message: string;
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const comments = await CommentModel.find({});
    return NextResponse.json({ data: comments }, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", {
      status: 500,
    });
  }
}
