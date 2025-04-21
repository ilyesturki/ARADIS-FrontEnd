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

  const line = useAppSelector((state) => state.fpss.line);

  useEffect(() => {
    const loadFpss = async () => {
      const response = await fetchFpss(
        `?line=${line}&page=${currentPage}&limit=9`
      );
      console.log(response);
      setFpss(response.data);
      if (response.pagination?.numberOfPages) {
        setNumberOfPages(response.pagination.numberOfPages);
      }
    };
    loadFpss();
  }, [currentPage, line]);
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
