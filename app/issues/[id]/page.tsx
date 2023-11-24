import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading,Text } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkDown from 'react-markdown'
const IssuedetailPage =async ({params}:{params:{id:string}}) => {
  const id=parseInt(params.id)
  if(typeof id =='undefined')notFound()
 const issue=await prisma.issue.findUnique({
    where:{id:+id}
  })
  if(!issue) notFound()
  await delay(2000)
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap='3' my='2'>
        <IssueStatusBadge status={issue.status}/>
        <Text>{issue.createAt.toDateString()}</Text>
      </Flex>
      <Card className='prose' >
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </div>
  )
}

export default IssuedetailPage