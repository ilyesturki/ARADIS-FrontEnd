"use client";
import { FpsCommentType } from "@/redux/fpsComments/fpsCommentsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { customHandleSubmit } from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import {
  fpsDeleteCommentValidationRules,
  fpsSaveCommentValidationRules,
  fpsUpdateCommentValidationRules,
} from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import {
  createFpsComment,
  deleteFpsComment,
  getComments,
  updateFpsComment,
} from "@/redux/fpsComments/fpsCommentsThunk";

// import { initialFpsValidation } from "@/data/fps";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { FpsType } from "@/redux/fps/fpsSlice";

const useComments = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession({ required: true }); 
  const dispatch = useAppDispatch();
  const [fpsData, setFpsData] = useState<{
    comments: ({ active?: boolean } & FpsCommentType)[];
  }>({
    comments: [
      {
        active:
          session?.user.role &&
          ["admin", "manager"].includes(session?.user.role)
            ? true
            : false,
        comment: "",
        date: new Date().toString(),
        rating: 5,
        user: {
          id: session?.user?.id || "",
          firstName: session?.user?.firstName || "",
          lastName: session?.user?.lastName || "",
          role: session?.user?.role || "",
          image: session?.user?.image || "",
        },
      },
    ],
  });
  const [fpsId, setFpsId] = useState<FpsType["fpsId"]>("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const fpsId = params.get("fpsId");

    if (fpsId) {
      setFpsId(fpsId);
      dispatch(getComments(fpsId));
      return;
    }
  }, []);
  const fpsComments = useAppSelector((state) => state.fpsComments);

  useEffect(() => {
    console.log(fpsComments);
    if (fpsComments && Object.keys(fpsComments).length > 0) {
      const comments = [
        ...(fpsComments?.comments.length > 0
          ? fpsComments?.comments
          : [
              {
                active:
                  session?.user.role &&
                  ["admin", "manager"].includes(session?.user.role)
                    ? true
                    : false,
                comment: "",
                date: new Date().toString(),
                rating: 5,
                user: {
                  id: session?.user?.id || "",
                  firstName: session?.user?.firstName || "",
                  lastName: session?.user?.lastName || "",
                  role: session?.user?.role || "",
                  image: session?.user?.image || "",
                },
              },
            ]),
      ];
      console.log("fpsComments?.validation");
      console.log(comments);
      console.log("fpsComments?.validation");
      setFpsData({
        comments,
      });
    }
  }, [fpsComments]);

  const addNewComment = () => {
    setFpsData((prevData) => ({
      ...prevData,
      comments: [
        ...(prevData.comments || []),
        {
          active:
            session?.user.role &&
            ["admin", "manager"].includes(session?.user.role)
              ? true
              : false,
          comment: "",
          date: new Date().toString(),
          rating: 5,
          user: {
            id: session?.user?.id || "",
            firstName: session?.user?.firstName || "",
            lastName: session?.user?.lastName || "",
            role: session?.user?.role || "",
            image: session?.user?.image || "",
          },
        },
      ],
    }));
  };

  const removeComment = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const selectedCommentId = fpsData.comments[index].id;
    if (selectedCommentId) {
      const dataToValidate: Record<string, string> = {
        id: selectedCommentId.toString(),
      };
      const newErrors = validateFormFields(
        dataToValidate,
        fpsDeleteCommentValidationRules
      );
      if (Object.keys(newErrors).length > 0) {
        handleError({ customError: true, errors: newErrors });
        return;
      }

      customHandleSubmit(
        e,
        {},
        {
          id: selectedCommentId,
        },
        () => dispatch(deleteFpsComment(selectedCommentId))
      );
    }
  };
  const handleChangeComment = (data: string, i?: number) => {
    setFpsData((prevData) => ({
      ...prevData,
      comments: prevData.comments?.map((item, index) =>
        index === i ? { ...item, comment: data } : item
      ),
    }));
  };
  const updateComment = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const selectedComment = fpsData.comments[index];
    console.log("selectedComment");
    console.log(selectedComment);
    console.log("selectedComment");
    if (selectedComment.id) {
      const dataToValidate: Record<string, string> = {
        id: selectedComment.id.toString(),
        comment: selectedComment.comment,
        rating: selectedComment.rating.toString(),
      };
      const newErrors = validateFormFields(
        dataToValidate,
        fpsUpdateCommentValidationRules
      );
      if (Object.keys(newErrors).length > 0) {
        handleError({ customError: true, errors: newErrors });
        return;
      }

      customHandleSubmit(
        e, 
        {},
        {
          comment: selectedComment.comment,
          rating: selectedComment.rating.toString(),
        },
        (formData) =>
          dispatch(
            updateFpsComment({
              id: dataToValidate.id,
              fpsComment: formData,
            })
          )
      );
    }
  };

  const handleSaveComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    const lastComment = fpsData.comments[fpsData.comments.length - 1];

    const dataToValidate: Record<string, string> = {
      fpsId: fpsId,
      comment: lastComment.comment,
      rating: lastComment.rating.toString(),
      date: lastComment.date,
      userId: lastComment.user.id.toString(),
    };
    console.log(dataToValidate);
    const newErrors = validateFormFields(
      dataToValidate,
      fpsSaveCommentValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }

    customHandleSubmit(
      e,
      {},
      {
        comment: lastComment.comment,
        rating: lastComment.rating.toString(),
        date: lastComment.date,
        userId: lastComment.user.id,
      },
      (formData) =>
        dispatch(createFpsComment({ id: fpsId, fpsComment: formData }))
    );
  };

  return {
    fpsData,
    setFpsData,
    fpsId,
    addNewComment,
    removeComment,
    handleChangeComment,
    handleSaveComment,
    updateComment,
    session,
  };
};

export default useComments;
