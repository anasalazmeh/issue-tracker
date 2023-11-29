import prisma from "@/prisma/client";
import { Box, Flex, Table, TableColumnHeaderCell } from "@radix-ui/themes";
import { IssueBotton, IssueStatusBadge, Link } from "../../components";
import IssueStatusFilter from "./IssueStatusFilter";
import { Status } from "@prisma/client";
import { object } from "zod";

const Issuepage = async ({searchParams}:{searchParams:{status:Status}}) => {
  const statuses=Object.values(Status)
  const status=statuses.includes(searchParams.status)? searchParams.status :undefined
  const data = await prisma.issue.findMany({
    where:{status}
  });
  return (
    <div className=" space-y-5">
      <Flex justify='between'>
        <IssueStatusFilter/>
      <IssueBotton href={"/issues/new"}>New issues</IssueBotton>
      </Flex>
      <Table.Root className="w-full" variant="surface">
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Status
            </TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell">
              Created
            </TableColumnHeaderCell>
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
    </div>
  );
};

export default Issuepage;
