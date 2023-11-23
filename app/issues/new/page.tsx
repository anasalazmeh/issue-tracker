"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import React from "react";

const NewIssues = () => {
  return (
    <div className="space-y-3 max-w-xl ">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit new issue</Button>
    </div>
  );
};

export default NewIssues;
