'use client'
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
const IssueStatusFilter = () => {
  const searchParams=useSearchParams()
  const statuses: { label: string, value?:"OPEN"|"IN_PROGRESS"|"CLOSED"; }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];
  const route=useRouter()
  return (
    <Select.Root defaultValue={searchParams.get('status')||" "} onValueChange={(status)=>{
      let param=``
      if(status !==" ") param+=`status=${status}`
      if(searchParams.get('orderBy')) param+=`&orderBy=${searchParams.get('orderBy')!}`
      const query= param !==`` ?`?${param}`:""
      route.push(`/issues/list${query}`)
      // const params = new URLSearchParams()
      //   if(Status !== " ") params.append('status', Status)
      //   if(searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!)
      //   const query = params.size ? `?${params}` : '';
      //   route.push(/issues/list + query);
    }}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;