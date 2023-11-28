
import { IssueBotton } from "@/app/components";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteButton from "./DeleteButton";
import IssueDelails from "./IssueDelails";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";


const IssuedetailPage = async ({ params }: { params: { id: string } }) => {
 const session=await getServerSession(authOptions)
  const id = parseInt(params.id);
  if (typeof id == "undefined") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: +id },
  });
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "5" }} gapY='2' gapX='4'>
      <Box className="col-span-4">
        <IssueDelails issue={issue} />
      </Box>
      
      { session &&<Box className="flex flex-col w-full space-y-3">
      <AssigneeSelect/>
        <IssueBotton
          className="flex items-center"
          href={`/issues/edit/${issue.id}`}
        >
          <Pencil2Icon className="mr-2" />
          Edit Issue
        </IssueBotton>
        <DeleteButton issueId={1}/>
      </Box>}
    </Grid>
  );
};

export default IssuedetailPage;
