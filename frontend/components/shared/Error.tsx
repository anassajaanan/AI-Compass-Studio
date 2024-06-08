type PropsType = {
  err: string | null;
};

const Error = ({ err }: PropsType) => {
  if (!err) return;

  return (
    <p className="container px-0 pb-4 flex flex-col items-center mx-auto max-w-3xl">
      <span className="text-red-500 font-bold">{err}</span>
    </p>
  );
};

export default Error;
