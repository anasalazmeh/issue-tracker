import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { default as Link, default as NextLink } from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}
interface Props {
  searchParams: IssueQuery;
  issue: Issue[];
}
const IssueTable = ({ searchParams, issue }: Props) => {
  return (
    <Table.Root className="w-full" variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((item) => (
            <Table.ColumnHeaderCell key={item.value} className={item.className}>
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
        {issue?.map((item) => (
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
  );
};
const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issues", value: "title" },
  { label: "statue", value: "status", className: "hidden md:table-cell" },
  { label: "create", value: "createAt", className: "hidden md:table-cell" },
];
export const columnsValues = columns.map((column) => column.value);
export default IssueTable;
