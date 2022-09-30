const DOTS = "...";

function range(start, end) {
  let length = end - start + 1;
  return Array.from({ length }, (item, index) => index + start);
}

function paginationCaculator(
  totalRecord,
  pageSize,
  siblingCount = 1,
  currentPage
) {
  const totalPage = Math.ceil(totalRecord / pageSize);
  const firstPage = 1;
  const lastPage = totalPage;
  const siblingLeftPage = Math.max(firstPage, currentPage - siblingCount);
  const siblingRightPage = Math.min(lastPage, currentPage + siblingCount);
  const defaultPaginationPage = [
    firstPage,
    DOTS,
    siblingLeftPage,
    currentPage,
    siblingRightPage,
    DOTS,
    lastPage,
  ].length;
  const oneSidePageCount = 5;
  if (totalPage < defaultPaginationPage) {
    
    return range(firstPage, totalPage);
  }
  if (siblingLeftPage > 2 && siblingRightPage <= totalPage - 2) {
    return [
      firstPage,
      DOTS,
      ...range(siblingLeftPage, siblingRightPage),
      DOTS,
      lastPage,
    ];
  }
  if (!(siblingLeftPage > 2) && siblingRightPage < totalPage - 2) {
    return [...range(firstPage, oneSidePageCount), DOTS, lastPage];
  }
  if (siblingLeftPage > 2 && !(siblingRightPage < totalPage - 2)) {
    return [
      firstPage,
      DOTS,
      ...range(lastPage - oneSidePageCount + siblingCount, lastPage),
    ];
  }

}


export {
  DOTS, paginationCaculator
}