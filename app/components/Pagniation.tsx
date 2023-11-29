'use client'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowDownIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import React from 'react'
interface Props{
  itemCount:number
  pageSize:number,
  currentPage:number,
}
const Pagniation = ({itemCount,pageSize,currentPage}:Props) => {
  const pageCount=Math.ceil(itemCount/pageSize)
  if(pageSize <=1)return null
  return (
    <Flex align='center' gap='2'>
      <Text size='2' >Page {currentPage} of {pageCount}</Text>
      <Button color='gray' variant='soft' disabled={currentPage===1}>
        <DoubleArrowLeftIcon/>
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage===1}>
        <ChevronLeftIcon/>
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage===pageCount}>
        <ChevronRightIcon/>
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage===pageCount}>
        <DoubleArrowRightIcon/>
      </Button>
    </Flex>
  )
}

export default Pagniation