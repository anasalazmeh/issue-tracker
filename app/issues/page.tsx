import prisma from "@/prisma/client";
import { Table, TableColumnHeaderCell } from "@radix-ui/themes";
import delay from "delay";
import { IssueStatusBadge, Link } from "../components";
import IssueAction from "./IssueAction";
const Issuepage = async () => {
  const data = await prisma.issue.findMany();
  await delay(2000)
  return (
    <div className=" space-y-5">
      <IssueAction/>
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
