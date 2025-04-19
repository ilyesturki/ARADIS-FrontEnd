import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

const ActionBox = ({
  data,
  editAction,
  removeAction,
  i,
  disabled,
}: {
  data: string[];
  editAction: any;
  removeAction: any;
  i: number;
  disabled?: boolean;
}) => {
  return (
    <div
      key={i}
      className="flex justify-between items-center px-3 py-1.5 bg-grayscale-500 bg-opacity-70 rounded-sm"
    >
      <div className="flex-1 grid grid-cols-3 items-center text-[10px] font-medium text-grayscale-100">
        {data.map((e, i) => {
          return (
            <span key={i} className="">
              {e}
            </span>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => editAction(i)}
          disabled={disabled}
          className={`flex justify-center items-center w-5 aspect-1 rounded-full bg-redAccent-900 ${
            disabled ? "bg-opacity-50 cursor-not-allowed" : "bg-opacity-90"
          } shadow-[0_0_1px] shadow-grayscale-400 `}
        >
          <FontAwesomeIcon
            icon={faEdit}
            className="w-3 h-3 sm:w-4 sm:h-4 text-[8px] sm:text-[10px] text-grayscale-100"
          />
        </button>
        <button
          onClick={() => removeAction(i)}
          disabled={disabled}
          className={`flex justify-center items-center w-5 aspect-1 rounded-full bg-redAccent-900 ${
            disabled ? "bg-opacity-50 cursor-not-allowed" : "bg-opacity-90"
          } shadow-[0_0_1px] shadow-grayscale-400 `}
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="w-3 h-3 sm:w-4 sm:h-4 text-[8px] sm:text-[10px] text-grayscale-100"
          />
        </button>
      </div>
    </div>
  );
};

export default ActionBox;
