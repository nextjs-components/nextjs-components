interface ExampleProps extends React.PropsWithChildren {
  style?: React.CSSProperties;
}
const Example = ({ children, style }: ExampleProps) => {
  return (
    <div
      style={style}
      className="mx-0 my-10 flex min-h-[240px] w-full items-center justify-center rounded-md bg-example p-10 dark:bg-example-dark [&>*]:w-[--width]"
    >
      {children}
    </div>
  );
};

export default Example;
