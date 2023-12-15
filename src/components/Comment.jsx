import React from 'react'
import useUserData from '../helpers/useUserData'
import { formatDistanceToNow } from "date-fns";
export default function Comment({comment,createdBy,createdDate}) {
  const userQuery =  useUserData(createdBy)
  if(userQuery.isLoading){
    return (<div className='comment'>
        <div>
            <div className='comment-header'>Loading...</div>
        </div>
    </div>)
  }
  return (
    <div className="comment">
      <img src={userQuery.data?.profilePictureUrl} alt="Commenter Avatar" />
      <div>
        <div className="comment-header">
          <span>{userQuery.data?.name}</span> commented{" "}
          <span>{formatDistanceToNow(new Date(createdDate))}</span>
        </div>
        <div className="comment-body">{comment}</div>
      </div>
    </div>
  );
}
