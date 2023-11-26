import React from 'react'
import dynamic from 'next/dynamic'
import LoadingForm from './loading'
const IssueForm = dynamic(() => import('../_components/IssueForm'), {
  ssr: false,
  loading:()=><LoadingForm/>
});
const IssueNew = () => {
  return (
    <IssueForm/>
  )
}

export default IssueNew