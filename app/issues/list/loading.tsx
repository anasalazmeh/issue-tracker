import { Skeleton } from "@/app/components";
import { Table, TableColumnHeaderCell } from "@radix-ui/themes";
import IssueAction from "./IssueAction";

const LoadingIssue = () => {
  const data = [1, 2, 3, 4, 5];
  return (
    <div className="space-y-5">
      <IssueAction/>
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
            <Table.Row key={item}>
              <Table.Cell>
                <Skeleton style={{ width: "130px" }} />
                <div className="block md:hidden">
                  <Skeleton style={{ width: "60px" }} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton style={{ width: "60px" }} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton style={{ width: "100px" }} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssue;
