"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
const CopyButton = ({ data }: { data: string | number }) => {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(data.toString())}
      className=" ml-1.5 mt-0.5 "
    >
      <FontAwesomeIcon
        icon={faCopy}
        className="w-4 h-4 text-sm text-greenAccent-900"
      />
    </button>
  );
};

export default CopyButton;
