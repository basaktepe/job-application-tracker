import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { defaultStatuses } from "@/features/jobs/constants";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stages = await prisma.stage.findMany({
    where: { userId: session.user.id },
  });

  // Return default statuses if user has no custom stages
  if (stages.length === 0) {
    return NextResponse.json(defaultStatuses);
  }

  return NextResponse.json(
    stages.map((s) => ({ label: s.label, group: s.group }))
  );
}

export async function POST(req: NextRequest) {
  // const session = await auth();
  // if (!session?.user?.id) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const body = await req.json();

  const stage = await prisma.stage.create({
    data: {
      label: body.label,
      group: body.group,
      // userId: session.user.id,
      userId: "test-user", // temporary
    },
  });

  return NextResponse.json(
    { label: stage.label, group: stage.group },
    { status: 201 }
  );
}

export async function DELETE(req: NextRequest) {
  // const session = await auth();
  // if (!session?.user?.id) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const { label } = await req.json();

  await prisma.stage.deleteMany({
    // where: { userId: session.user.id, label },
    where: { label },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  // const session = await auth();
  // if (!session?.user?.id) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  // const userId = session.user.id;
  const userId = "test-user"; // temporary
  const { stages } = await req.json();

  // Replace all stages for this user
  await prisma.$transaction([
    prisma.stage.deleteMany({ where: { userId } }),
    prisma.stage.createMany({
      data: stages.map((s: { label: string; group: string }) => ({
        label: s.label,
        group: s.group,
        userId,
      })),
    }),
  ]);

  return NextResponse.json({ success: true });
}
