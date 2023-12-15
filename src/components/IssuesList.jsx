import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { IssueItem } from "./IssueItem";
import React from "react";
import fetchWithErrors from "../helpers/fetchWithErrors";
import Loader from "./Loader";
export default function IssuesList({ labels, status,pageNum ,setPageNum}) {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = React.useState("");
  const searchQuery = useQuery(
    ["issues", "search", searchValue],
    ({ signal }) =>
      fetch(`/api/search/issues?q=${searchValue}`, { signal }).then((res) =>
        res.json()
      ),
    {
      enabled: !!searchValue.length > 0,
    }
  );
  const finalList = labels.map((label) => {
    return `labels[]=${label}`;
  });
  const labelString = finalList.join("&");
  const statusString = status ? `&status=${status}` : "";
  const pageString = pageNum ? `&page=${pageNum}`:"";
  const fetchIssues = async ({ signal }) => {
    const results = await fetchWithErrors(
      `/api/issues?${labelString}${statusString}${pageString}`,
      { signal }
    );

    results.forEach((issue) => {
      queryClient.setQueryData(["issues", issue.number.toString()], issue);
    });

    return results;
  };
  const issuesQuery = useQuery({
    queryKey: ["issues", { labels, status,pageNum }],
    queryFn: fetchIssues,
    staleTime: 100 * 60,
   keepPreviousData:true,

  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchValue(e.target.elements.search.value);
        }}
      >
        <label htmlFor="search"></label>
        <input
          type="search"
          name="search"
          id="search"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setSearchValue("");
            }
          }}
        />
      </form>
      <h1>Issues List {issuesQuery.isFetching ? <Loader /> : ""}</h1>
      {issuesQuery.isLoading ? (
        <p>loading....</p>
      ) : issuesQuery.isError ? (
        <p>{issuesQuery.error.message}</p>
      ) : searchQuery.isLoading === true &&
        searchQuery.fetchStatus === "idle" ? (
        <>
          <ul>
            {issuesQuery.data.map((issue) => {
              return (
                <IssueItem
                  key={issue.id}
                  assignee={issue.assignee}
                  commentsCount={issue.comments.length}
                  createdBy={issue.createdBy}
                  createdDate={issue.createdDate}
                  id={issue.id}
                  number={issue.number}
                  status={issue.status}
                  title={issue.title}
                  labels={issue.labels}
                />
              );
            })}
          </ul>
          <div className="pagination">
            <button disabled={pageNum===1} onClick={()=>{
              if(pageNum-1>0){
                setPageNum(pageNum-1)
              }
            }}>Prev</button>
            <p>page {pageNum} {issuesQuery.isFetching?"...":""}</p>
            <button disabled={issuesQuery.data?.length===0 || issuesQuery.isPreviousData} onClick={()=>{
              if(!issuesQuery.data?.length !==0 || !issuesQuery.isPreviousData){
                setPageNum(pageNum+1)
              }
            }}>Next</button>
          </div>
        </>
      ) : (
        <>
          <h2>search Results</h2>
          {searchQuery.isLoading ? (
            <p>loading...</p>
          ) : (
            <>
              <p>{searchQuery.data.count} Results</p>
              {searchQuery.data.items.map((issue) => {
                return (
                  <IssueItem
                    key={issue.id}
                    assignee={issue.assignee}
                    commentsCount={issue.comments.length}
                    createdBy={issue.createdBy}
                    createdDate={issue.createdDate}
                    id={issue.id}
                    number={issue.number}
                    status={issue.status}
                    title={issue.title}
                    labels={issue.labels}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}
