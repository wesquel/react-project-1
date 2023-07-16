import { useCallback, useEffect, useState } from "react";
// import { useFetch } from "./use-fetch";

const useAsync = (asyncFunction, shouldRun) => {
  const [result, setResult] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");

  const run = useCallback(async () => {
    setResult(null);
    setError(null);

    await new Promise((r) => setTimeout(r, 2000));
    setStatus("pending");

    return asyncFunction()
      .then((response) => {
        setStatus("settled");
        setResult(response);
      })
      .catch((err) => {
        setError(err);
        setStatus("error");
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (shouldRun) {
      run();
    }
  }, [run, shouldRun]);

  return [run, result, error, status];
};

const fetchData = async () => {
  await new Promise((r) => setTimeout(r, 2000));
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const json = await data.json();
  return json;
};

export const Home = () => {
  const [posts, setPosts] = useState(null);
  const [reFetchData, result, error, status] = useAsync(fetchData, true);

  if (status == "idle") {
    return <pre>Nada Executanto</pre>;
  }
  if (status == "pending") {
    return <pre>Loading</pre>;
  }
  if (status == "settled") {
    return <pre>{JSON.stringify(result, null, 2)}</pre>;
  }
  if (status == "error") {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }
};

export default Home;
