import React from 'react'

export default async function fetchWithErrors(url,options) {
       const resp =  await fetch(url,options)
       if(resp.status===200){
       const data =  await resp.json()
       if(data.error){
        throw new Error(resp.error)
       }
       return data;
       }
       throw new Error(`Error ${resp.status}:${resp.statusText}`)
}
