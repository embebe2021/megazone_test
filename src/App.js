import { useState } from "react";
import "./App.css";
import AppFooter from "./AppFooter/AppFooter";
import AppInput from "./AppInput/AppInput";
import AppResult from "./AppResult/AppResult";

function createWork(workName) {
  return {
    name: workName,
    active: false,
    completed: false,
  };
}
function toggleCompletedWork(work, value) {
  value === undefined
    ? (work.completed = !work.completed)
    : (work.completed = value);
  return work;
}

function App() {
  const [workList, setWorkList] = useState({
    data: [],
    status: true,
    selectedIndex: [],
  });
  const [showMode, setShowMode] = useState("All");

  // console.log(workList);
  const addAWork = (workName) => {
    let work = createWork(workName);
    setWorkList((lastWorkList) => ({
      ...lastWorkList,
      status: false,
      data: [...lastWorkList.data, work],
    }));
  };

  const deleteWork = (listIndex) => {
    let workListClone = JSON.parse(JSON.stringify(workList.data));

    for (let i = 0; i < listIndex.length; i++) {
      const getSelectedWorkIndex = workListClone.indexOf(
        workListClone[listIndex[i]]
      );
      workListClone.splice(getSelectedWorkIndex, 1);
    }
    setWorkList((lastWorkList) => ({
      status: false,
      data: workListClone,
      selectedIndex: [],
    }));
  };

  const updateWorkName = (index, value) => {
    let workListClone = workList.data;
    workListClone[index].name = value;
    setWorkList((lastWorkList) => ({
      ...lastWorkList,
      data: workListClone,
    }));
  };

  const updateWorkList = (listIndex, setValue) => {
    let workListClone = JSON.parse(JSON.stringify(workList.data));
    let selectedWorkIndexClone = workList.selectedIndex;

    for (let i = 0; i < listIndex.length; i++) {
      let workUpdated = toggleCompletedWork(
        workListClone[listIndex[i]],
        setValue
      );
      workListClone[listIndex[i]] = workUpdated;
      if (!selectedWorkIndexClone.includes(listIndex[i])) {
        selectedWorkIndexClone.push(listIndex[i]);
      } else {
        selectedWorkIndexClone = selectedWorkIndexClone.filter(
          (index) => index !== listIndex[i]
        );
      }
    }
    setWorkList((lastWorkList) => {
      if (setValue === undefined) {
        return {
          selectedIndex: selectedWorkIndexClone,
          status: false,
          data: workListClone,
        };
      } else {
        setValue
          ? (selectedWorkIndexClone = listIndex)
          : (selectedWorkIndexClone = []);
        return {
          selectedIndex: selectedWorkIndexClone,
          data: workListClone,
          status: setValue,
        };
      }
    });
  };

  const switchResultMode = (mode) => {
    setShowMode(mode);
  };

  const toggleAll = () => {
    const workListLength = workList.data.length;
    const statusAllList = workList.status;
    const listIndex = Array.from(
      { length: workListLength },
      (element, index) => index
    );
    updateWorkList(listIndex, !statusAllList);
  };
  return (
    <div className="App">
      <h1 className="appTitle">todos</h1>

      <div className="appWrapper ">
        <AppInput addAWork={addAWork}>
          <div className="markAll" onClick={toggleAll}>
            {"❯"}
          </div>
        </AppInput>
        <AppResult
          workList={workList.data}
          resultShowMode={showMode}
          updateWorkList={updateWorkList}
          deleteWork={deleteWork}
          updateWorkName={updateWorkName}
        />
        <AppFooter
          showMode={showMode}
          workList={workList.data}
          switchResultMode={switchResultMode}
          selectedWorkIndex={workList.selectedIndex}
          deleteWork={deleteWork}
        />
      </div>
    </div>
  );
}

export default App;
