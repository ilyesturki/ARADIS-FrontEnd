"use client";
import { FpsCommentType, FpsType, flexibleFpsType } from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { customHandleSubmit, handleChangeInArray } from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import {
  fpsDeleteCommentValidationRules,
  fpsSaveCommentValidationRules,
  fpsUpdateCommentValidationRules,
} from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import {
  createFpsComment,
  createFpsValidation,
  getFps,
  updateFpsComment,
} from "@/redux/fps/fpsThunk";

import { initialFpsValidation } from "@/data/fps";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const useValidationSection = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession({ required: true });
  const dispatch = useAppDispatch();
  const [fpsData, setFpsData] = useState<{ comments: FpsCommentType[] }>({
    comments: [
      {
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
    let fpsId = params.get("fpsId");

    if (fpsId) {
      setFpsId(fpsId);
      return;
    }
  }, []);
  const fps = useAppSelector((state) => state.fpss.fps);

  useEffect(() => {
    if (fps && Object.keys(fps).length > 0) {
      const comments = [
        ...(fps?.comments || [
          {
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
      console.log("fps?.validation");
      console.log(fps);
      console.log("fps?.validation");
      setFpsData({
        comments,
      });
    }
  }, [fps]);

  const addNewComment = () => {
    setFpsData((prevData) => ({
      ...prevData,
      comments: [
        ...(prevData.comments || []),
        {
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
        id: selectedCommentId,
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
        () => dispatch(deleteFpsComment(id))
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
    if (selectedComment.id) {
      const dataToValidate: Record<string, string> = {
        id: selectedComment.id,
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
        (formData) => dispatch(updateFpsComment({ id: fpsId, fps: formData }))
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
      userId: lastComment.user.id,
    };
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
        fpsId: fpsId,
        comment: lastComment.comment,
        rating: lastComment.rating.toString(),
        date: lastComment.date,
        userId: lastComment.user.id,
      },
      (formData) => dispatch(createFpsComment({ id: fpsId, fps: formData }))
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
  };
};

export default useValidationSection;
