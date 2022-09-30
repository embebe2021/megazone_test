import { useState } from "react";
import "./App.css";
import AppFooter from "./AppFooter/AppFooter";
import AppInput from "./AppInput/AppInput";
import AppResult from "./AppResult/AppResult";

function createWork(workName) {
  return {
    name: workName,
    completed: false,
  };
}

function toggleCompletedWork(work, value) {
  value === undefined
    ? (work.completed = !work.completed)
    : (work.completed = value);
  return work;
}

function getStateWorkFromLocal() {
  const appState = window.localStorage.getItem("workListState");
  if (appState) {
    return JSON.parse(appState);
  } else {
    return {
      data: [],
      status: true,
      selectedIndex: [],
    };
  }
}
function saveStateToLocal(state) {
  return window.localStorage.setItem("workListState", JSON.stringify(state));
}

function App() {
  const appState = getStateWorkFromLocal();
  const [workList, setWorkList] = useState(appState);
  const [showMode, setShowMode] = useState("All");

  const addAWork = (workName) => {
    let work = createWork(workName);
    setWorkList((lastWorkList) => {
      let resultState = {
        ...lastWorkList,
        status: false,
        data: [...lastWorkList.data, work],
      };
      saveStateToLocal(resultState);
      return resultState;
    });
  };

  const deleteWork = (listIndex) => {
    let workListClone = JSON.parse(JSON.stringify(workList.data));

    for (let i = 0; i < listIndex.length; i++) {
      workListClone[listIndex[i]] = null;
    }
    const resultWork = workListClone.filter((item) => item);
    let resultIndex = [];
    resultWork.forEach((item, index) => {
      console.log(item);
      if (item?.completed === true) {
        resultIndex.push(index);
      }
    });

    setWorkList((lastWorkList) => {
      const resultState = {
        ...lastWorkList,
        status: false,
        data: resultWork,
        selectedIndex: resultIndex,
      };
      saveStateToLocal(resultState);
      return resultState;
    });
  };

  const updateWorkName = (index, value) => {
    let workListClone = workList.data;
    workListClone[index].name = value;

    setWorkList((lastWorkList) => {
      const resultState = {
        ...lastWorkList,
        data: workListClone,
      };
      saveStateToLocal(resultState);
      return resultState;
    });
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
      let resultState;
      if (setValue === undefined) {
        resultState = {
          selectedIndex: selectedWorkIndexClone,
          status: false,
          data: workListClone,
        };
      } else {
        setValue
          ? (selectedWorkIndexClone = listIndex)
          : (selectedWorkIndexClone = []);
        resultState = {
          selectedIndex: selectedWorkIndexClone,
          data: workListClone,
          status: setValue,
        };
      }
      saveStateToLocal(resultState);
      return resultState;
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
          selectedWorkIndex={workList.selectedIndex}
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
