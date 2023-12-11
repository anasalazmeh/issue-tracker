"use client";
import { Spinner } from "@/app/components";
import { Issue } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogContent,
  Button,
  Flex
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteButton = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isLoading, setloading] = useState(false);
  const onDelete = async () => {
    try {
      setloading(true);
      await axios.delete("/api/issues/" + issue.id);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setloading(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button className="bg-red-500 hover:bg-red-400 transition-all text-white p-1 rounded-sm" disabled={isLoading}>
            Delecte Issue
            {isLoading && <Spinner/>}
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Confim Delection</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure want to delete this issue? This action cannot be undone
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <button className="bg-gray-100 hover:bg-gray-50 transition-all px-2 rounded-md" >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <button className="bg-red-500 hover:bg-red-400 transition-all text-white p-2 rounded-md" onClick={onDelete}>
                Delecte Issue
              </button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialogContent>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialogContent>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
