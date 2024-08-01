import React, { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";

interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
}

const TodoForm: React.FC = () => {
  const [lastText, setText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const buttonAdd = useRef<HTMLButtonElement | null>(null);

  // Fetch data and set tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (err) {
        console.log("Error fetching tasks:", err);
      }
    };

    fetchData();
  }, []);

  const getText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const getIDTask = (id: number): void => {
    setTasks((prevTasks) => prevTasks.filter((u) => u.id !== id));
  };

  const getIDEdit = (id: number, newText: string): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const addTask = () => {
    // if(lastText.trim() !== ""){
    //  fetch(http://localhost:3000/tasks, {
    //    method: 'POST',
    //    headers: {
    //      'Content-Type': 'application/json',
    //   }
    //    body: JSON.stringify({
    //        text: newText
    //        'ID': 2,
    //        'Name': 'John',
    //        'lastName': 'Doe'
    //   })
    // })
    //  .then(response => response.json())
    //  .then(console.log(newPerson,"Has been Added to Json")
    //}
    if (lastText.trim() !== "") {
      const newTask: Task = {
        id: tasks.length + 1, // Ideally, you would use a unique ID from the backend
        text: lastText,
        isCompleted: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setText("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-4">To Do Lists</h2>
      <div className="w-full max-w-lg mb-4">
        <input
          onChange={getText}
          value={lastText}
          placeholder="Add Task..."
          type="text"
          className="w-full p-2 border rounded mb-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              // addTask();
              if (buttonAdd.current) {
                buttonAdd.current.click();
              }
            }
          }}
        />
        <button
          ref={buttonAdd}
          onClick={addTask}
          className="w-full p-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Add
        </button>
      </div>
      {tasks.length > 0
        ? tasks.map((task) => (
            <TodoList
              {...task}
              key={task.id}
              getID={getIDTask}
              editID={getIDEdit}
            />
          ))
        : "Loading..."}
    </div>
  );
};

export default TodoForm;
