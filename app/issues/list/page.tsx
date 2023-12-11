import Pagniation from "@/app/components/Pagniation";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import IssueTable, { IssueQuery, columnsValues } from "./IssueTable";
const IssueAction = dynamic(() => import("./IssueAction"), {
  ssr: false,
});
interface Props {
  searchParams: IssueQuery;
}
const Issuepage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columnsValues.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issue =await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({
    where: {
      status,
    },
  });

  return (
    <div className=" space-y-5">
      <IssueAction />
      <IssueTable searchParams={searchParams} issue={issue} />
      <Pagniation
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default Issuepage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
