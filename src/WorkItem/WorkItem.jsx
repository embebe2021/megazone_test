import React from "react";

class WorkItem extends React.Component {
  constructor(props) {
    super(props);
    const { name, completed } = props.work;
    this.inputRef = React.createRef();
    this.state = {
      checked: completed,
      isOnEdit: false,
      workName: name,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const lastCheckUpdate = this.props.work.completed;
    if (prevProps.work.completed !== lastCheckUpdate) {
      this.setState({ checked: lastCheckUpdate });
    }
  }
  componentWillUnmount() {
    this.inputRef.current.removeEventListener("keydown", this.listenOnInput);
  }
  handleCheck() {
    const { index, onToggle } = this.props;
    const { checked } = this.state;
    this.setState({
      checked: !checked,
    });
    onToggle(index);
  }
  deleteThisWork() {
    const { index, onDeleteWork } = this.props;
    // console.log(index);
    onDeleteWork([index]);
  }
  openEdit() {
    const inputElement = this.inputRef.current;

    inputElement.addEventListener("keydown", (e) => this.listenOnInput(e));
    this.setState(
      {
        isOnEdit: true,
      },
      () => {
        let x = setTimeout(() => {
          clearTimeout(x);
          this.inputRef.current.focus();
          let val = inputElement.value;
          inputElement.value = "";
          inputElement.value = val;
        }, 10);
      }
    );
  }
  listenOnInput = (e) => {
    const { name } = this.props.work;
    const lastValue = name;
    const inputElement = this.inputRef.current;
    if (e.keyCode === 27) {
      this.setState(
        {
          isOnEdit: false,
          workName: lastValue,
        },
        () => {
          inputElement.addEventListener("keydown", this.listenOnInput);
        }
      );
    }
  };
  handleChangeWorkName(e) {
    this.setState({
      workName: e.target.value,
      editDraft: e.target.value,
    });
  }
  handleBlur() {
    const { workName } = this.state;
    const { updateWorkName, index } = this.props;
    const inputElement = this.inputRef.current;
    if (workName.length < 1) {
      this.deleteThisWork();
    } else {
      this.setState(
        {
          isOnEdit: false,
          workName: workName,
        },
        () => {
          updateWorkName(index, workName);
          inputElement.addEventListener("keydown", this.listenOnInput);
        }
      );
    }
  }
  handleSubmitWorkName(e) {
    e.preventDefault();
    // console.log(e);
    const { workName } = this.state;
    const { updateWorkName, index } = this.props;
    if (workName.length > 0) {
      updateWorkName(index, workName);
    } else {
      this.deleteThisWork();
    }
  }
  render() {
    const { checked, isOnEdit, workName } = this.state;
    const getInputClassName = () => {
      let name = "itemInput";
      if (checked) {
        name = `${name} itemInputComplete`;
      }
      if (isOnEdit) {
        name = `${name} itemInputOnEdit`;
      }
      return name;
    };
    return (
      <li
        className="workItem"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <input
          className="workItemCheckBox"
          type="checkbox"
          checked={checked}
          onChange={this.handleCheck.bind(this)}
        />
        <form
          onSubmit={(e) => this.handleSubmitWorkName(e)}
          className="wrapper"
          onDoubleClick={this.openEdit.bind(this)}
        >
          <input
            className={getInputClassName()}
            ref={this.inputRef}
            type="text"
            disabled={!isOnEdit}
            value={workName}
            onChange={this.handleChangeWorkName.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            autoFocus={true}
          />
        </form>
        <span className="deleteWork" onClick={this.deleteThisWork.bind(this)}>
          X
        </span>
      </li>
    );
  }
}
export default WorkItem;
