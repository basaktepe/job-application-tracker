"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { JobApplication } from "@/features/jobs/types";

export async function getJobs(): Promise<JobApplication[]> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return prisma.jobApplication.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function createJob(
  job: Omit<JobApplication, "id">
): Promise<JobApplication> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return prisma.jobApplication.create({
    data: {
      ...job,
      userId: session.user.id,
    },
  });
}

export async function updateJobStatus(
  id: string,
  status: string
): Promise<{ id: string; status: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.jobApplication.update({
    where: { id, userId: session.user.id },
    data: { status },
  });

  return { id, status };
}

export async function deleteJob(id: string): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.jobApplication.delete({
    where: { id, userId: session.user.id },
  });

  return id;
}

export async function getStages() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return prisma.stage.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });
}

export async function addStage(stage: {
  label: string;
  group: string;
  color?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return prisma.stage.create({
    data: {
      ...stage,
      userId: session.user.id,
    },
  });
}

export async function removeStage(label: string): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.stage.deleteMany({
    where: {
      label,
      userId: session.user.id,
    },
  });

  return label;
}

export async function resetStages(stages: any[]) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.stage.deleteMany({
    where: { userId: session.user.id },
  });

  return prisma.stage.createMany({
    data: stages.map((s) => ({
      ...s,
      userId: session.user.id,
    })),
  });
}
