import React from "react";

class AppInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      workName: "",
    };
  }
  handleChangeWorkName(value) {
    this.setState({
      workName: value,
    });
  }
  handleSubmitWork(e) {
    e.preventDefault();
    const { addAWork } = this.props;
    const { workName } = this.state;
    if (workName.length > 0) {
      addAWork(workName);
      this.setState({
        workName: "",
      });
      this.inputRef.current.focus();
    }
  }
  render() {
    const { workName } = this.state;
    const { children } = this.props;
    return (
      <form className="inputWrapper" onSubmit={(e) => this.handleSubmitWork(e)}>
        <input
          value={workName}
          ref={this.inputRef}
          onChange={(e) => this.handleChangeWorkName(e.target.value)}
          className="appInput"
          placeholder="What needs to be done?"
        />
        {children}
      </form>
    );
  }
}
export default AppInput;
