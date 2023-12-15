import useLabelsData from "../helpers/useLabelsData";

export default function LabelList({ labels, handleLabels }) {
  const labelsQuery = useLabelsData();

  return (
    <div className="labels">
      <h3>Labels</h3>
      {labelsQuery.isLoading && <p>loading...</p>}
      <ul>
        {labelsQuery.isSuccess
          ? labelsQuery.data.map((label) => {
              return (
                <li
                  key={label.name}
                  className={`label ${
                    labels.includes(label.name) ? "selected" : ""
                  } ${label.color}`}
                  onClick={() => handleLabels(label.id)}
                >
                  {label.name}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
}
