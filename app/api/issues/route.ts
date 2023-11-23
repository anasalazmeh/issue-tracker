import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createissueshema } from "../../validationSachema";

export async function GET(requset: NextRequest) {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues, { status: 200 });
}
export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createissueshema.safeParse(body);
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
