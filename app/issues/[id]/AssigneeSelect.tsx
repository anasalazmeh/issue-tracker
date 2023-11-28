'use client'
import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import React, { useEffect, useState } from 'react'

const AssigneeSelect = () => {
  const {data:users,isLoading ,error}=useQuery<User[]>({
    queryKey:['users'],
    queryFn:()=>axios.get('/api/users').then(res=>res.data),
    staleTime :60*1000,//60s
    retry:3
  })
  if(error) return null
  return (
    <Select.Root>
  <Select.Trigger placeholder="Assignee..." />
  <Select.Content>
    <Select.Group>
      <Select.Label>
        Suggestion
      </Select.Label>
      {isLoading && <Skeleton />}
      {users?.map(user=>(<Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>))}
    </Select.Group>
  </Select.Content>
</Select.Root>
  )
}

export default AssigneeSelect