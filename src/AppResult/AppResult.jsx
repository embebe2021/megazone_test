import React, { useEffect } from "react";
import { useState } from "react";
import WorkItem from "../WorkItem/WorkItem";

const AppResult = ({
  workList,
  updateWorkList,
  resultShowMode,
  deleteWork,
  updateWorkName,
}) => {
  const [listToShow, setListToShow] = useState([]);

  useEffect(() => {
    let cloneWorkList = workList.map((item, index) => {
      return {
        info: item,
        index: index,
      };
    });
    let result;
    switch (resultShowMode) {
      case "All": {
        result = cloneWorkList;
        break;
      }
      case "Active": {
        result = cloneWorkList.filter((item) => item.info.completed === false);
        break;
      }
      case "Completed": {
        result = cloneWorkList.filter((item) => item.info.completed === true);
        break;
      }
      default:
        result = cloneWorkList;
    }
    setListToShow(result);
  }, [workList, resultShowMode]);

  const onToggle = (index) => {
    // console.log(index);
    updateWorkList([index]);
  };
  return (
    <>
      {workList.length > 0 && (
        <ul className="appResult">
          {listToShow.map((item, index) => (
            <React.Fragment key={item.info.name + index}>
              <WorkItem
                work={item.info}
                index={item.index}
                onToggle={(index) => onToggle(index)}
                onDeleteWork={(index) => deleteWork(index)}
                updateWorkName={updateWorkName}
              />
            </React.Fragment>
          ))}
        </ul>
      )}
    </>
  );
};
export default AppResult;
