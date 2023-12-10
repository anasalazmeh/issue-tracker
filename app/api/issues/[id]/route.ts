import authOptions from "@/app/auth/authOptions";
import { issueshema, patchissueschema } from "@/app/validationSachema";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session =getServerSession(authOptions)
  if(!session)
  return NextResponse.json({},{status:401})
  const body = await request.json();
  const validation = patchissueschema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const { title, description, assignedToUserId } = body;
  if(assignedToUserId){
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
    return NextResponse.json({ error: "Invalied user." }, { status: 400 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalied issue" }, { status: 404 });
  const newIssue = await prisma.issue.update({
    where: {id:issue.id},
    data: {
      title,
      description,
      assignedToUserId,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalied issue" }, { status: 404 });
  await delay(2000);
  const newIssue = await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
