import React from 'react'
import { useQuery } from 'react-query'

export default function useIssueDetails(issueNumber) {
   const issueQuery= useQuery({
        queryKey:["issues",issueNumber],
        queryFn:({signal})=>fetch(`/api/issues/${issueNumber}`,{signal}).then((res)=>res.json())
    })
  return issueQuery
}
