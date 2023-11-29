import prisma from "@/prisma/client";
import { Box, Flex, Table, TableColumnHeaderCell } from "@radix-ui/themes";
import { IssueBotton, IssueStatusBadge, Link } from "../../components";
import IssueStatusFilter from "./IssueStatusFilter";
import { Issue, Status } from "@prisma/client";
import { object } from "zod";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagniation from "@/app/components/Pagniation";
interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}
const Issuepage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issues", value: "title" },
    { label: "statue", value: "status", className: "hidden md:table-cell" },
    { label: "create", value: "createAt", className: "hidden md:table-cell" },
  ];
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const data = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take:pageSize
  });
  const issueCount= await prisma.issue.count({
    where:{
      status
    }
  })

  return (
    <div className=" space-y-5">
      <Flex justify="between">
        <IssueStatusFilter />
        <IssueBotton href={"/issues/new"}>New issues</IssueBotton>
      </Flex>
      <Table.Root className="w-full" variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((item) => (
              <Table.ColumnHeaderCell
                key={item.value}
                className={item.className}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: item.value } }}
                >
                  {item.label}
                </NextLink>
                {item.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <Link href={`/issues/${item.id}`}>{item.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={item.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={item.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {item.createAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagniation itemCount={issueCount} pageSize={pageSize} currentPage={page}/>
    </div>
  );
};

export default Issuepage;
