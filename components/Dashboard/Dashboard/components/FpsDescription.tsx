import FpsDescriptionField from "./FpsDescriptionField";

const FpsDescription = () => {
  return (
    <div className="flex flex-col gap-3 py-5">
      <FpsDescriptionField title="Current Step :" value="Validation" />
      <FpsDescriptionField title="Date :" value="Feb 1,2025" />
      <FpsDescriptionField title="Created By :" value="Torki Ilyess" />
      <FpsDescriptionField
        title="Description :"
        value="loream ipsum dolor sit amet ipsum dolor sit amet"
      />
    </div>
  );
};

export default FpsDescription;
