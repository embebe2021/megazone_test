import React from "react";
import { DOTS, paginationCaculator } from "./pagination";

class TablePagination extends React.Component {
  constructor(props) {
    super(props);
    this.paginationCaculator = paginationCaculator;
    this.state = {
      paginationList: [],
    };
  }
  componentDidMount() {
    this.updatePagination();
  }
  componentDidUpdate(preProps, preState) {
    const { currentPage, totalRecord, pageSize } = this.props;
    console.log(
      "🚀 ~ file: TablePagination.jsx ~ line 17 ~ TablePagination ~ componentDidUpdate ~ totalRecord",
      totalRecord
    );
    const { paginationList } = this.state;
    const lastPage = paginationList[paginationList.length - 1];
    if (currentPage * pageSize - totalRecord === pageSize && currentPage > 1) {
      this.handleChangePage(currentPage - 1);
    }
    if (lastPage * pageSize - totalRecord === pageSize) {
      this.setState({
        paginationList: this.paginationCaculator(
          totalRecord,
          pageSize,
          1,
          currentPage
        ),
      });
    }
    if (totalRecord !== preProps.totalRecord) {
      this.updatePagination();
    }
  }
  updatePagination() {
    const { totalRecord, pageSize, currentPage } = this.props;
    this.setState(
      (state) => ({
        ...state,
      }),
      () => {
        this.setState((state) => ({
          ...state,
          paginationList: this.paginationCaculator(
            totalRecord,
            pageSize,
            1,
            currentPage
          ),
        }));
      }
    );
  }
  handlePrev() {
    if (this.props.currentPage > 1) {
      this.props.onPageChange(this.props.currentPage - 1);
      this.updatePagination();
    }
  }
  handleNext() {
    const { paginationList } = this.state;
    const lastPage = paginationList[paginationList.length - 1];
    if (this.props.currentPage <= lastPage - 1) {
      this.props.onPageChange(this.props.currentPage + 1);
      this.updatePagination();
    }
  }
  handleChangePage(page) {
    this.props.onPageChange(page);
    this.updatePagination();
  }
  render() {
    const { paginationList } = this.state;
    return (
      <>
        <ul className={"pagination"}>
          <li onClick={() => this.handlePrev()}>{"<"}</li>
          {paginationList.map((item, index) => {
            if (item === DOTS) {
              return <li key={index}>{DOTS}</li>;
            }
            return (
              <li
                key={index}
                onClick={() => this.handleChangePage(item)}
                className={
                  this.props.currentPage === item ? "pagination--active" : ""
                }
              >
                {item}
              </li>
            );
          })}
          <li onClick={() => this.handleNext()}>{">"}</li>
        </ul>
      </>
    );
  }
}

export default TablePagination;
