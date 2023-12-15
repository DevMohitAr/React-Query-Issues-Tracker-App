import React from "react";
import { GoIssueOpened, GoIssueClosed } from "react-icons/go";
import useUserData from "../helpers/useUserData";
import { formatDistanceToNow } from "date-fns";
export default function IssueHeader({
  title,
  number,
  status = "todo",
  createdBy,
  createdDate,
  comments,
}) {
  const statusObject = possibleStatus.find((pstatus) => pstatus.id === status);
  const createdUser = useUserData(createdBy)
  return (
    <header>
      <h2>
        {title} <span>#{number}</span>
      </h2>
      <div>
        <span
          className={status === "done" || status === "open" ? "closed" : "open"}
        >
          {status === "done" || status === "cancelled" ? (
            <GoIssueClosed />
          ) : (
            <GoIssueOpened />
          )}
          {statusObject.label}
        </span>
        <span className="created-by">
            {createdUser.isLoading ? "...." : createdUser.data?.name}
        </span>{" "}
        opened this issue {formatDistanceToNow(new Date(createdDate))} - {comments.length} comments
      </div>
    </header>
  );
}

const possibleStatus = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "To-do" },
  { id: "inProgress", label: "In-progress" },
  { id: "done", label: "Done" },
  { id: "cancelled", label: "Cancelled" },
];
