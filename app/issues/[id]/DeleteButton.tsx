"use client";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error,setError]=useState(false)
  const onDelete=async () => {
    try{
      throw new Error()
      await axios.delete("/api/issues/" + issueId);
    router.push("/issues");
    router.refresh();
    }
    catch (error){
      setError(true)
    }
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delecte Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Confim Delection</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure want to delete this issue? This action cannot be undone
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={onDelete}
              >
                Delecte Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialogContent>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
          <Button color="gray" variant="soft" mt='2' onClick={()=>setError(false)}>Ok</Button>
        </AlertDialogContent>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
