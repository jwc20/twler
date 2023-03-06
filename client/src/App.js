import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const url = "http://127.0.0.1:8000/api/";

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const response = await axios.get(url);
        setIsLoading(false);
        const allTodos = response.data;
        console.log(allTodos);
        setTodos(allTodos);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
    };

    getAllTodos();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {todos &&
        todos.map((item, index) => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <p>{item.body}</p>
          </div>
        ))}
      {isError && <div>Error fetching data.</div>}
    </div>
  );
}

export default App;
