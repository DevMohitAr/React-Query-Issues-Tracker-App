import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function AddIssue() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addIssue = useMutation(
    (issuebody) =>
      fetch("/api/issues", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(issuebody),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["issue", data.number.toString()], data);
        navigate(`/issue/${data.number}`);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["issues"],{exact:true})
      },
    }
  );
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(addIssue.isLoading) return null;
    addIssue.mutate({title:e.target.title.value,comment:e.target.comment.value})
  }
  return (
    <div className="add-issue">
      <h2>Add Issue</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="title" name="title" />
        <label htmlFor="comment">Comment</label>
        <textarea
          placeholder="comment"
          name="comment"
          id="coment"
          cols="30"
          rows="10"
        ></textarea>
        <button disabled={addIssue.isLoading} type="submit">{addIssue.isLoading ?"Adding issue....":"Add Issue"}</button>
      </form>
    </div>
  );
}
