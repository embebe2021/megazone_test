import { useMemo } from "react";

const footerMode = ["All", "Active", "Completed"];

const AppFooter = ({
  workList,
  selectedWorkIndex,
  switchResultMode,
  deleteWork,
  showMode,
}) => {
  const handleClick = (e) => {
    switchResultMode(e.target.innerText);
  };
  const handleDeleteAllSelected = () => {
    deleteWork(selectedWorkIndex);
  };
  const getStatus = useMemo(() => {
    const itemLeft = workList.filter((item) => item.completed === false).length;
    let isMany;
    itemLeft < 2 ? (isMany = "item") : (isMany = "items");

    return { title: `${itemLeft} ${isMany} left`, itemLeft: itemLeft };
  }, [workList, selectedWorkIndex.length, showMode]);
  return (
    <div className="appFooter">
      <span>{getStatus.title}</span>
      <span className="footerMid">
        {footerMode.map((item) => (
          <span
            key={item}
            className={
              showMode === item
                ? "footerMode footerShowModeActive"
                : "footerMode"
            }
            onClick={handleClick}
          >
            {item}
          </span>
        ))}
      </span>
      <span
        className={
          selectedWorkIndex.length > 0 ? "showDeleteAll" : "hideDeleteAll"
        }
        onClick={handleDeleteAllSelected}
      >
        Clear completed
      </span>
    </div>
  );
};

export default AppFooter;
