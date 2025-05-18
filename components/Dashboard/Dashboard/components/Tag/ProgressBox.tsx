import { FaCheck } from "react-icons/fa";

const ProgressBox = ({
  status,
}: {
  status: "done" | "inProgress" | "notYet";
}) => {
  return (
    <div
      className={`w-10 h-10 flex justify-center items-center ${
        status === "done"
          ? "bg-greenAccent-900 bg-opacity-60"
          : status === "inProgress"
          ? "border-2 border-greenAccent-900"
          : "bg-neutral-300"
      } rounded-full`}
    >
      <span
        className={`text-base ${
          status === "inProgress"
            ? "text-greenAccent-900"
            : "text-grayscale-100"
        }  font-bold`}
      >
        {status === "inProgress" ? (
          "2"
        ) : status === "notYet" ? (
          "3"
        ) : (
          <FaCheck />
        )}
      </span>
    </div>
  );
};

export default ProgressBox;
