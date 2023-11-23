"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
interface Issueform {
  title: string;
  description: string;
}
const  NewIssues = () => {
  const route=useRouter()
  const { control, handleSubmit, register } = useForm<Issueform>();
  return (
    <form className="space-y-3 max-w-xl " onSubmit={handleSubmit(async (data)=>{
      await axios.post('/api/issues',data)
      route.push('/issues')
    })}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button>Submit new issue</Button>
    </form>
  );
};

export default NewIssues;
