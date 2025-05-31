"use client";
import { fetchTags } from "@/utils/Api/tagApi";
import { useEffect, useState } from "react";
import Paginator from "@/components/Common/Paginator";


import TagsGridBox from "./TagsGridBox";


const TagsGrid = () => {
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    const loadTags = async () => {
      const response = await fetchTags(`?page=${currentPage}&limit=9`);
      setTags(response.data);
      if (response.pagination?.numberOfPages) {
        setNumberOfPages(response.pagination.numberOfPages);
      }
    };
    loadTags();
  }, [currentPage]);
  return (
    <>
      <TagsGridBox tags={tags} />
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
      />
    </>
  );
};

export default TagsGrid;
