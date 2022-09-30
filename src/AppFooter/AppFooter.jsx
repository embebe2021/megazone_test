const footerMode = ["All", "Active", "Completed"];

const AppFooter = ({
  workList,
  selectedWorkIndex,
  switchResultMode,
  deleteWork,
  showMode,
}) => {
  const handleClick = (e) => {
    // console.log(e.target.innerText);
    switchResultMode(e.target.innerText);
  };
  const handleDeleteAllSelected = () => {
    deleteWork(selectedWorkIndex);
  };
  const getStatus = () => {
    const itemLeft = workList.length - selectedWorkIndex.length;
    let isMany;
    itemLeft < 2 ? (isMany = "item") : (isMany = "items");

    return `${itemLeft} ${isMany} left`;
  };
  return (
    <div className="appFooter">
      <span>{getStatus()}</span>
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
