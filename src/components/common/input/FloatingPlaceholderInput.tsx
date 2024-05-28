interface FloatingPlaceholderInputProps {
  className?: string;
  placeHolder?: string;
  type?: string;
  id?: string;
  name?: string;
}

export default function FloatingPlaceholderInput({
  className,
  placeHolder,
  type,
  id,
  name,
}: FloatingPlaceholderInputProps) {
  return (
    <>
      <div className="rounded-lg bg-white p-4">
        <div className="relative bg-inherit">
          <input
            type={type ?? "text"}
            id={id}
            name={name}
            className="peer h-10 w-72 rounded-lg bg-transparent px-2 text-black placeholder-transparent ring-2 ring-gray-500 focus:border-rose-600 focus:outline-none focus:ring-sky-600"
            placeholder={placeHolder}
          />
          <label
            htmlFor={name}
            className="pointer-events-none absolute -top-3 left-0 mx-1 cursor-text bg-inherit px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-sky-600"
          >
            {placeHolder}
          </label>
        </div>
      </div>
    </>
  );
}
