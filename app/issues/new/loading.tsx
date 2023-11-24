import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const LoadingIssueNew = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton/>
      <Skeleton height='20rem'/>
      <Skeleton className='mt-7' width='8rem' height='2rem'/>
    </Box>
  )
}

export default LoadingIssueNew