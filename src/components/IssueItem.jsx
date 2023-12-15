import { GoIssueClosed, GoIssueOpened, GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import useUserData from "../helpers/useUserData";
import useLabelsData from "../helpers/useLabelsData";
import { useQueryClient } from "react-query";
import fetchWithErrors from "../helpers/fetchWithErrors";

export const IssueItem = ({
  assignee,
  commentsCount,
  createdBy,
  createdDate,
  number,
  status,
  title,
  labels,
}) => {
  const queryClient=useQueryClient()
  const createdByUser = useUserData(createdBy);
  const assigneeUser = useUserData(assignee);
  console.log("labels",labels);
  return (
    <li onMouseEnter={()=>{
      queryClient.prefetchQuery(["issues",number.toString()],()=>fetchWithErrors(`/api/issues/${number}`))
      queryClient.prefetchInfiniteQuery(["issues",number.toString(),"comments"],()=>fetchWithErrors(`/api/issues/${number}/comments?page=1`))
    }}>
      <div>
        {status === "done" || status === "cancelled" ? (
          <GoIssueClosed style={{ color: "red" }} />
        ) : (
          <GoIssueOpened style={{ color: "green" }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
             <Label key={label} label={label} />
            
          ))}
        </span>
        <small>
          #{number} opened {formatDistanceToNow(new Date(createdDate))} ago by{" "}
          {createdByUser.isSuccess ? createdByUser.data.name : ""}
        </small>
      </div>

      {assignee ? (
        <img
          src={
            assigneeUser.isSuccess ? assigneeUser.data.profilePictureUrl : ""
          }
          className="assigned-to"
          alt={`assigned to ${
            assigneeUser.isSuccess ? assigneeUser.data.name : "avatar"
          }`}
        />
      ) : null}
      <span className="comment-count">
        {commentsCount > 0 ? (
          <>
            <GoComment />
            {commentsCount}
          </>
        ) : null}
      </span>
    </li>
  );
};

const Label = ({ label }) => {
  const labelsQuery = useLabelsData();
  if (labelsQuery.isLoading) return null;
  const labelObj = labelsQuery.data?.find((item) => item.id === label);
  if(!labelObj) return null;
  return <span className={labelObj.color}>{labelObj.name}</span>;
};
