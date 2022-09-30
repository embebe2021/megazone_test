import React, { useEffect } from "react";
import { useState } from "react";
import WorkItem from "../WorkItem/WorkItem";
import TablePagination from "../Pagination/TablePagination";

function listByCurrentPage(dataList, currentPage, itemPerPage) {
  const firstItemIndex = (currentPage - 1) * itemPerPage;
  const lastItemIndex = firstItemIndex + itemPerPage;
  let result;
  if (dataList.length > firstItemIndex) {
    result = dataList.slice(firstItemIndex, lastItemIndex);
  } else {
    result = dataList.slice(0, itemPerPage);
  }
  return result;
}

const AppResult = ({
  workList,
  updateWorkList,
  resultShowMode,
  selectedWorkIndex,
  deleteWork,
  updateWorkName,
}) => {
  const [pagination, setPagination] = useState({
    listAllWork: [],
    listToShow: [],
    pageSize: 5,
    currentPage: 1,
  });
  const { pageSize, currentPage } = pagination;
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
    let pageData = listByCurrentPage(result, currentPage, pageSize);
    // console.log(
    //   "🚀 ~ file: AppResult.jsx ~ line 52 ~ useEffect ~ pageData",
    //   pageData
    // );
    setPagination((prev) => ({
      ...prev,
      listAllWork: result,
      listToShow: pageData,
    }));
  }, [workList, resultShowMode, currentPage, selectedWorkIndex.length]);

  const onToggle = (index) => {
    updateWorkList([index]);
  };
  const handlePageChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };
  return (
    <>
      {pagination.listToShow.length > 0 && (
        <>
          <ul className="appResult">
            {pagination.listToShow.map((item, index) => (
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
          <TablePagination
            totalRecord={pagination.listAllWork.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={(page) => handlePageChange(page)}
          />
        </>
      )}
    </>
  );
};
export default AppResult;
