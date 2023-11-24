import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueAction = () => {
  return (
    <Button>
      <Link href={"/issues/new"}>New issues</Link>
    </Button>
  );
};

export default IssueAction;
