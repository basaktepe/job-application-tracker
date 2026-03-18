import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const jobs = await prisma.jobApplication.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const job = await prisma.jobApplication.create({
    data: {
      company: body.company,
      position: body.position,
      status: body.status || "Not Applied",
      dateApplied: body.dateApplied,
      url: body.url || "",
      notes: body.notes || "",
      userId: session.user.id,
    },
  });

  return NextResponse.json(job, { status: 201 });
}
