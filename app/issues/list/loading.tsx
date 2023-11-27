import { IssueBotton, Skeleton } from "@/app/components";
import { Table, TableColumnHeaderCell } from "@radix-ui/themes";


const LoadingIssue = () => {
  const data = [1, 2, 3, 4, 5];
  return (
    <div className="space-y-5">
      <IssueBotton href={"/issues/new"}>New issues</IssueBotton>
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
                <Skeleton style={{ width: "50px" }} />
                <div className="block md:hidden">
                  <Skeleton style={{ width: "20px" }} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton style={{ width: "20px" }} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton style={{ width: "50px" }} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssue;
