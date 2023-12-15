import React from "react";
import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import { StatusSelect } from "../components/StatusSelect";
import { Link } from "react-router-dom";

export default function Issues() {
  const [labels, setLabels] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const [pageNum,setPageNum] = React.useState(1)
  const handleLabels = (id) => {
    if (labels.includes(id)) {
      setLabels(labels.filter((label) => label !== id));
    } else {
      setLabels((labels) => labels.concat(id));
    }
    setPageNum(1)
  };
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList
            labels={labels}
            handleLabels={handleLabels}
            status={status}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        </section>
        <aside>
          <LabelList labels={labels} handleLabels={handleLabels} />

          <h3>Status</h3>
          <StatusSelect
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPageNum(1)
            }}
          />
          <Link className="button" to="/add">Add Issue</Link>
        </aside>
      </main>
    </div>
  );
}
