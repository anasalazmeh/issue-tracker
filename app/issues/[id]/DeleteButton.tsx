'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const DeleteButton = ({issueId}:{issueId:number}) => {
  const router =useRouter()
  return (
    <AlertDialog.Root>
  <AlertDialog.Trigger>
  <Button color='red'>Delecte Issue</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content style={{ maxWidth: 450 }}>
    <AlertDialog.Title>Confim Delection</AlertDialog.Title>
    <AlertDialog.Description size="2">
      Are you sure want to delete this issue?
      This action cannot be undone
    </AlertDialog.Description>

    <Flex gap="3" mt="4" justify="end">
      <AlertDialog.Cancel>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action>
        <Button variant="solid" color="red" onClick={ async ()=>{
          await axios.delete('/api/issues/'+issueId)
          router.push('/issues')
          router.refresh()
        }}>
        Delecte Issue
        </Button>
      </AlertDialog.Action>
    </Flex>
  </AlertDialog.Content>
</AlertDialog.Root>

  )
}

export default DeleteButton