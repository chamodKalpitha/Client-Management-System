import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen text-gray-700">
        <h1 className=" text-4xl font-bold">Oops!</h1>
        <p className="text-gray-800 mt-4">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="bg-gray-200 text-gray-500 mt-4">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  );
}
