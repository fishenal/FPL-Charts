export const CustomButton = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  [k: string]: any;
}) => {
  return (
    <div
      className="py-1 px-2 bg-amber-200 hover:bg-amber-100 rounded-md cursor-pointer flex justify-center items-center text-sky-900"
      {...props}
    >
      {children}
    </div>
  );
};
