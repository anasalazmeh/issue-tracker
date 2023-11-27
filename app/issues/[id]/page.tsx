
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import IssueDelails from "./IssueDelails";
import DeleteButton from "./DeleteButton";
import { IssueBotton } from "@/app/components";


const IssuedetailPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  if (typeof id == "undefined") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: +id },
  });
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "4" }} gapY='5' gapX='9'>
      <Box className="col-span-3">
        <IssueDelails issue={issue} />
      </Box>
      <Box className="flex flex-col max-w-fit space-y-3">
        <IssueBotton
          className="flex items-center"
          href={`/issues/${issue.id}/edit`}
        >
          <Pencil2Icon className="mr-2" />
          Edit Issue
        </IssueBotton>
        <DeleteButton issueId={1}/>
      </Box>
    </Grid>
  );
};

export default IssuedetailPage;
