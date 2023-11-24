import prisma from "@/prisma/client";
import { Button, Table, TableColumnHeaderCell } from "@radix-ui/themes";
import Link from "next/link";
const Issuepage = async () => {
  const data = await prisma.issue.findMany();
  return (
    <div className=" space-y-5">
      <Button>
        <Link href={"/issues/new"}>New issues</Link>
      </Button>
      <Table.Root variant="surface">
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
                {item.title} <div className="block md:hidden">{item.status}</div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {item.status}
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
