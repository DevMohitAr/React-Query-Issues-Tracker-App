import React from 'react'
import { useQuery, useInfiniteQuery } from 'react-query'

export default function useIssueComments(issueNumber) {
 const commentsQuery =    useInfiniteQuery({
        queryKey:["issues",issueNumber,"comments"],
        queryFn:({signal,pageParam =1})=>fetch(`/api/issues/${issueNumber}/comments?page=${pageParam}`,{signal}).then((res)=>res.json()),getNextPageParam:(lastPage,pages)=>{
          if(lastPage.length===0) return;
          return pages.length+1
        }
    })
  return (commentsQuery)
}
