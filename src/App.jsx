import "./App.css";

import { useQuery } from "@tanstack/react-query";

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  });

  if (error) return <div>There was an error!</div>;

  if (isLoading) return <div>Loading... Please wait</div>;

  return (
    <div>
      <h1>Transtack Query</h1>
      {data.map((todo) => (
        <div key={todo.id}>
          <h3>Id: {todo.id}</h3>
          <h4>Title: {todo.title} </h4>
        </div>
      ))}
    </div>
  );
}

export default App;
