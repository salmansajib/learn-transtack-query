import "./App.css";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const posts = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
];

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

function App() {
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...posts]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() =>
        posts.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) {
    return <pre> {JSON.stringify(postQuery.error)} </pre>;
  }

  return (
    <div>
      <h1>Tanstack Query</h1>
      <div>
        {postQuery.data.map((post) => (
          <h3 key={post.id}>{post.title}</h3>
        ))}
        <button
          disabled={newPostMutation.isLoading}
          onClick={() => newPostMutation.mutate("new post")}
        >
          Add New
        </button>
      </div>
    </div>
  );
}

export default App;
