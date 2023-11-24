"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { createissueshema } from "@/app/validationSachema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, CalloutText, TextField } from "@radix-ui/themes";
import axios from "axios";
import delay from "delay";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
const SimpleMDE= dynamic(()=>import("react-simplemde-editor"),{ssr:false})
type Issueform = z.infer<typeof createissueshema>;
const NewIssues =  () => {
  const route = useRouter();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Issueform>({ resolver: zodResolver(createissueshema) });
  const [error, seterror] = useState("");
  const [isSunbit, setSumbit] = useState(false);
  const Submit = handleSubmit(async (data) => {
    try {
      setSumbit(true);
      await axios.post("/api/issues", data);
      setSumbit(false);
      route.push("/issues");
    } catch (error) {
      seterror("An unexpevted error occurred.");
      route.push("/issues/new");
    }
  });
   delay(3000)
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <CalloutText>{error}</CalloutText>
        </Callout.Root>
      )}
      <form className="space-y-3  " onSubmit={Submit}>
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
        <Button className="disabled:bg-violet-600" disabled={isSunbit}>
          Submit new issue {isSunbit && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssues;
