import { IssueBotton } from '@/app/components';
import { Flex } from '@radix-ui/themes';
import IssueStatusFilter from './IssueStatusFilter';

const IssueAction = () => {
  return (
    <Flex justify="between">
        <IssueStatusFilter />
        <IssueBotton href={"/issues/new"}>New issues</IssueBotton>
    </Flex>
  )
}

export default IssueAction