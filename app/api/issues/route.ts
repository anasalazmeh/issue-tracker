import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueshema } from "../../validationSachema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(requset: NextRequest) {
  const session =getServerSession(authOptions)
  if(!session)
  return NextResponse.json({},{status:401})
  const issues = await prisma.issue.findMany();
  if (!issues)
    return NextResponse.json(
      { error: "the data not invalid" },
      { status: 400 }
    );
  return NextResponse.json(issues, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session =getServerSession(authOptions)
  if(!session)
  return NextResponse.json({},{status:401})
  const body = await request.json();
  const validation = issueshema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
