import authOptions from "@/app/auth/authOptions";
import { IssueBotton } from "@/app/components";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteButton from "./DeleteButton";
import IssueDelails from "./IssueDelails";
import { cache } from "react";

const fatchUser = cache((issueId: number) =>
prisma.issue.findUnique({ where: { id: issueId.toString() } }));
const IssuedetailPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const id = parseInt(params.id);
  if (typeof id == "undefined") notFound();
  const issue = await fatchUser(id)
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "5" }} gapY="2" gapX="5">
      <Box className="col-span-4">
        <IssueDelails issue={issue} />
      </Box>

      {session && (
        <Box className="flex flex-col w-full space-y-3 ">
          <AssigneeSelect issue={issue} />
          <IssueBotton
            className="flex items-center"
            href={`/issues/edit/${issue.id}`}
          >
            <Pencil2Icon className="mr-2" />
            Edit Issue
          </IssueBotton>
          <DeleteButton issue={issue} />
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const issue = await fatchUser(parseInt(params.id))
  return {
    title: issue?.title,
    description: "Details of issue" + issue?.id,
  };
}
export default IssuedetailPage;

