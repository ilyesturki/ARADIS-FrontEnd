import RemoveSectionButton from "../RemoveSectionButton";

const DefensiveActionHeader = ({
  i,
  removeDefensiveAction,
}: {
  i: number;
  removeDefensiveAction: () => void;
}) => {
  return (
    <div className="flex items-center justify-between px-2">
      <span className="text-sm font-bold capitalize text-greenAccent-900">
        procedure N°{i + 1}
      </span>
      <RemoveSectionButton
        removeDefensiveAction={() => removeDefensiveAction()}
      />
    </div>
  );
};

export default DefensiveActionHeader;
