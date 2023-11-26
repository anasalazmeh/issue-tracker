import { IssueAction } from "@/app/components";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import IssueDelails from "./IssueDelails";


const IssuedetailPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  if (typeof id == "undefined") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: +id },
  });
  if (!issue) notFound();
  await delay(2000);
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDelails issue={issue} />
      </Box>
      <Box>
        <IssueAction
          className="flex items-center"
          href={`/issues/${issue.id}/edit`}
        >
          <Pencil2Icon className="mr-2" />
          Edit Issue
        </IssueAction>
      </Box>
    </Grid>
  );
};

export default IssuedetailPage;
