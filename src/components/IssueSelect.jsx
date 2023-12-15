import React from 'react'
import { StatusSelect } from './StatusSelect'
import { useMutation, useQueryClient } from 'react-query'

export default function IssueSelect({status,issueNumber}) {
    const queryClient = useQueryClient()
   const statusMutation =  useMutation((status)=>{
    fetch(`/api/issues/${issueNumber}`,{
        method:"PUT",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({status})
    }).then((res)=>res.json())
   },{
    onMutate:(status)=>{
        const oldStatus = queryClient.getQueryData(["issues",issueNumber]).status
        queryClient.setQueryData(["issues", issueNumber], (prev) => ({
          ...prev,
          status: status,
        }));
      return function rollback(){
        queryClient.setQueryData(["issues",issueNumber],(data)=>({...data,status:oldStatus}))
      }
    },
    onError:(error,variables,rollback)=>{
      rollback()
    },
    onSettled:()=>{
        queryClient.invalidateQueries(["issues",issueNumber],{exact:true})
    }
   })
  return (
    <div className='issue-options'>
        <div>
            <span>Status</span>
            <StatusSelect notEmptyOtion value={status} onChange={(e)=>statusMutation.mutate(e.target.value)}/>
        </div>
    </div>
  )
}



