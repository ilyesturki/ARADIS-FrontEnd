"use client";

import AddSectionButton from "../../Common/AddSectionButton";
import { FpsCommentType } from "@/redux/fps/fpsSlice";
import Comment from "./Comment";
import { useSession } from "next-auth/react";
import { handleChangeInArrayObject } from "@/utils/handlers";
import useComments from "./useComments";

interface Props {
  comments: FpsCommentType[];
  handleChangeComment: (value: any, index: number) => void;
  addNewComment: () => void;
  removeComment: (index: number) => void;
  setFpsData: (updater: (prevState: any) => any) => void;
}

const Comments = () => {
  const {
    fpsData,
    setFpsData,
    fpsId,
    addNewComment,
    removeComment,
    handleChangeComment,
    handleSaveComment,
    updateComment,
    session,
  } = useComments();

  if (
    fpsData.comments.length === 1 &&
    session?.user.role &&
    !["admin", "manager"].includes(session?.user.role)
  ) {
    return (
      <div className="h-[145px] flex items-center justify-center bg-grayscale-100 shadow-[0px_0px_2px] shadow-grayscale-500  rounded-md">
        <h1 className="text-lg font-semibold text-grayscale-500 text-opacity-50">
          No comments found !
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 pl-3 sm:pl-5 pr-[19px] sm:pr-7 py-4 max-h-[500px] overflow-y-scroll customScroll bg-sidebar-border rounded-[10px] shadow-[0_0_2px] shadow-grayscale-400 ">
        {fpsData.comments?.map((e, i) => {
          if (e.active === false) {
            return null;
          }
          return (
            <div className=" flex flex-col gap-2" key={i}>
              <Comment
                value={e.comment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleChangeComment(e.target.value, i)
                }
                userName={`${e.user.firstName} ${e.user.lastName}`}
                userRole={e.user.role}
                image={e.user.image}
                rating={e.rating}
                date={e.date}
                editRating={e.user.id === session?.user?.id}
                customRatingChange={(rating: number) =>
                  handleChangeInArrayObject(
                    setFpsData,
                    rating,
                    "comments",
                    "rating",
                    i
                  )
                }
                placeholder={
                  e.user.id === session?.user?.id ? "Add a comment" : undefined
                }
                disabled={e.user.id !== session?.user?.id}
                i={i}
                handleDeleteSection={
                  e.user.id === session?.user?.id
                    ? (e) => removeComment(e, i)
                    : undefined
                }
                // handleSaveComment={handleSaveComment}
                handleSaveComment={
                  e.user.id === session?.user?.id && e.active === undefined
                    ? (e) => updateComment(e, i)
                    : handleSaveComment
                }
                buttonTitle={
                  e.user.id === session?.user?.id && e.active === undefined
                    ? "update"
                    : "save"
                }
              />
            </div>
          );
        })}
      </div>
      {session?.user.role &&
        ["admin", "manager"].includes(session?.user.role) && (
          <AddSectionButton addNewSection={addNewComment} />
        )}
    </>
  );
};

export default Comments;
