"use client";

import AddSectionButton from "../../Common/AddSectionButton";
import { FpsCommentType } from "@/redux/fps/fpsSlice";
import Comment from "./Comment";
import { useSession } from "next-auth/react";
import { handleChangeInArrayObject } from "@/utils/handlers";

interface Props {
  comments: FpsCommentType[];
  handleChangeComment: (value: any, index: number) => void;
  addNewComment: () => void;
  removeComment: (index: number) => void;
  setFpsData: (updater: (prevState: any) => any) => void;
}

const Comments = ({
  comments,
  handleChangeComment,
  addNewComment,
  removeComment,
  setFpsData,
}: Props) => {
  const { data: session } = useSession({ required: true });
  return (
    <>
      {comments?.map((e, i) => {
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
                  ? () => removeComment(i)
                  : undefined
              }
            />
            {comments.length - 1 === i && (
              <AddSectionButton addNewSection={addNewComment} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default Comments;
