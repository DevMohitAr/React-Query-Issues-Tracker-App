import React from "react";

const possibleStatus = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "To-do" },
  { id: "inProgress", label: "In-progress" },
  { id: "done", label: "Done" },
  { id: "cancelled", label: "Cancelled" },
];
export const StatusSelect = ({ value, onChange ,notEmptyOtion=false}) => {
  return (
    <select value={value} onChange={onChange} className="status-select">
      {notEmptyOtion ?"":<option value="">Select a status to filter </option>}
      
      {possibleStatus.map((status) => {
        return (
          <option key={status.id} value={status.id}>
            {status.label}
          </option>
        );
      })}
    </select>
  );
};
