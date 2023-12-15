import { useParams } from "react-router-dom";
import useIssueDetails from "../helpers/useIssueDetails";
import useIssueComments from "../helpers/useIssueComments";
import IssueHeader from "./IssueHeader";
import Comment from "./Comment";
import IssueSelect from "./IssueSelect";
import IssueAssignment from "./issueAssignment";
import IssueLabels from "./issueLabels";
import Loader from "./Loader";
import useScrollToBottom from "../helpers/useScrollToBottom";

export default function IssueDetails() {
  const { number } = useParams();
  const issueQuery = useIssueDetails(number);
  const commentsQuery = useIssueComments(number);
  useScrollToBottom(document, commentsQuery.fetchNextPage, 100);
  if (issueQuery.isLoading) {
    return <p>loading....</p>;
  }
  return (
    <div className="issue-details">
      <IssueHeader {...issueQuery.data} />
      <main>
        <section>
          {commentsQuery.isLoading ? (
            <p>loading....</p>
          ) : (
            // commentsQuery.data.map((comment) => {
            //   return <Comment key={comment.id} {...comment} />;
            // })
            commentsQuery.data.pages.map((page) =>
              page.map((comment) => {
                return <Comment key={comment.id} {...comment} />;
              })
            )
          )}
          {commentsQuery.isFetchingNextPage && <Loader />}
        </section>
        <aside>
          <IssueSelect
            status={issueQuery.data.status}
            issueNumber={issueQuery.data.number.toString()}
          />
          <IssueAssignment
            assignee={issueQuery.data.assignee}
            issueNumber={issueQuery.data.number.toString()}
          />
          <IssueLabels
            labels={issueQuery.data.labels}
            issueNumber={issueQuery.data.number.toString()}
          />
        </aside>
      </main>
    </div>
  );
}
