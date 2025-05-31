"use client";
import { fetchFpss } from "@/utils/Api/fpsApi";
import { useEffect, useState } from "react";
import Paginator from "@/components/Common/Paginator";

import FpssGridBox from "./FpssGridBox";
import { useAppSelector } from "@/redux/hooks";

const FpssGrid = () => {
  const [fpss, setFpss] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);

  const machine = useAppSelector((state) => state.fpss.machine);

  useEffect(() => {
    const loadFpss = async () => {
      const response = await fetchFpss(
        `?machine=${machine}&page=${currentPage}&limit=9`
      );
      setFpss(response.data);
      if (response.pagination?.numberOfPages) {
        setNumberOfPages(response.pagination.numberOfPages);
      }
    };
    loadFpss();
  }, [currentPage, machine]);
  return (
    <>
      <FpssGridBox fpss={fpss} />
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
      />
    </>
  );
};

export default FpssGrid;
