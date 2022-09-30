import React from "react";

class WorkItem extends React.Component {
  constructor(props) {
    super(props);
    const { name, completed } = props.work;
    this.inputRef = React.createRef();
    this.state = {
      checked: completed,
      isDisable: true,
      workName: name,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const lastCheckUpdate = this.props.work.completed;
    if (prevProps.work.completed !== lastCheckUpdate) {
      this.setState({ checked: lastCheckUpdate });
    }
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
    const { isDisable } = this.state;
    this.setState(
      {
        isDisable: !isDisable,
      },
      () => {
        let x = setTimeout(() => {
          clearTimeout(x);
          this.inputRef.current.focus();
        }, 10);
      }
    );
  }
  handleChangeWorkName(e) {
    this.setState({
      workName: e.target.value,
    });
  }
  handleBlur() {
    const { workName } = this.state;
    // console.log(
    //   "🚀 ~ file: WorkItem.jsx ~ line 56 ~ WorkItem ~ handleBlur ~ workName",
    //   workName
    // );
    if (workName.length < 1) {
      this.deleteThisWork();
    }
    this.setState({
      isDisable: true,
    });
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
    // console.log(this.state.workName);
  }
  render() {
    const { checked, isDisable, workName } = this.state;
    const getInputClassName = () => {
      let name = "itemInput";
      if (checked) {
        name = `${name} itemInputComplete`;
      }
      if (!isDisable) {
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
            disabled={isDisable}
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
