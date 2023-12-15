import React from 'react'
import { useQuery } from 'react-query'

export default function useUserData(userId) {
  const usersData =   useQuery({
        queryKey:["users",userId],
        queryFn:({signal})=>fetch(`api/users/${userId}`,{signal}).then((res)=>res.json()),
        staleTime:1000*60*5
    })
  return usersData
}
