
const ActionsList = ({
  headers,
  children,
}: {
  headers?: string[];
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1 px-2 py-2 bg-sidebar border  dark:border-gray-700  rounded-md">
      {children ? (
        <>
          {headers && headers.length > 0 && (
            <div className="flex justify-between items-center px-3 py-1 rounded-sm">
              <div className="flex-1 grid grid-cols-3 items-center">
                {headers.slice(0, headers.length - 1).map((e, i) => {
                  return (
                    <span
                      key={i}
                      className="text-[10px] font-bold text-grayscale-500  dark:text-gray-400"
                    >
                      {e}
                    </span>
                  );
                })}
              </div>
              <span className="text-[10px] font-bold text-grayscale-500  dark:text-gray-400">
                {headers[headers.length - 1]}
              </span>
            </div>
          )}

          {children}
        </>
      ) : (
        <span className="w-full h-full flex justify-center items-center text-xl font-medium text-grayscale-500   dark:text-gray-400 text-opacity-20">
          No actions yet !
        </span>
      )}
    </div>
  );
};

export default ActionsList;
