import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import LoadingForm from '../../_components/LoadingForm';

const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
  ssr: false,
  loading:()=><LoadingForm/>
});
const IssueEdit =async ({params}:{params:{id:string}}) => {
  const Issue=await prisma.issue.findUnique({
    where:{id:parseInt(params.id)}
  })
  if(!Issue)notFound()
  return (
    <IssueForm issue={Issue}/>
  )
}

export default IssueEdit