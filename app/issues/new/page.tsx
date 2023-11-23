"use client";
import { Button, Callout, CalloutText, Text, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {z} from 'zod'
import axios from "axios";
import { createissueshema } from "@/app/validationSachema";
import { resolve } from "path";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";
type Issueform =z.infer<typeof createissueshema>
const  NewIssues = () => {
  const route=useRouter()
  const { control, handleSubmit, register,formState:{errors} } = useForm<Issueform>(
    {resolver:zodResolver(createissueshema)}
  );
  const [error,seterror]=useState('')
  return (
    <div className="max-w-xl">
      {error && <Callout.Root className="mb-5" color="red"><CalloutText >{error}</CalloutText></Callout.Root>}
      <form className="space-y-3  " onSubmit={handleSubmit(async (data)=>{
       try{
        await axios.post('/api/issues',data)
        route.push('/issues')
       }
       catch (error){
        seterror('An unexpevted error occurred.')
        route.push('/issues/new')
       }
    })}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
       <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button>Submit new issue</Button>
    </form>
    </div>
  );
};

export default NewIssues;
