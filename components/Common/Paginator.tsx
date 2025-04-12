"use client";

import ReactPaginate from "react-paginate";

import { useAppSelector } from "@/redux/hooks";

const Paginator = ({
  currentPage,
  setCurrentPage,
  numberOfPages = 1,
}: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  numberOfPages?: number;
}) => {
  const handlePageClick = (e: { selected: number }) => {
    setCurrentPage(e.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        className=" flex justify-center gap-2 my-10 text-sm"
        previousLabel="previous"
        previousLinkClassName=" px-4 py-2 bg-greenAccent-900 bg-opacity-80 capitalize text-white rounded-sm"
        pageLinkClassName=" px-4 py-2 bg-greenAccent-900 bg-opacity-80 text-grayscale-100 rounded-sm"
        breakLabel="..."
        breakLinkClassName=" px-4 py-2 bg-greenAccent-900 bg-opacity-80 text-grayscale-100 rounded-sm"
        nextLabel="next"
        activeLinkClassName=" px-4 py-2 !bg-greenAccent-900 bg-opacity-100 text-white rounded-sm"
        nextLinkClassName=" px-4 py-2 bg-greenAccent-900 bg-opacity-80 capitalize text-white rounded-sm"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={numberOfPages}
        marginPagesDisplayed={1}
        renderOnZeroPageCount={null}
        initialPage={currentPage - 1}
      />
    </>
  );
};

export default Paginator;
