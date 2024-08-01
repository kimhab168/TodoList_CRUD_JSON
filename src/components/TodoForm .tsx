import React, { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

const TodoForm: React.FC = () => {
  const [lastText, setText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [Editing, setEditing] = useState<boolean>(false);
  const buttonAdd = useRef<HTMLButtonElement | null>(null);
  const inputFocus = useRef<HTMLInputElement | null>(null);

  // Fetch data and set tasks
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const data: Task[] = await response.json();
      setTasks(data);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const getIDTask = async (id: string): Promise<void> => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    try {
      const response = await fetch(`http://localhost:3000/tasks/` + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }
    } catch (err) {
      console.error("Failed to delete the task:", err);
      // Optionally, revert the state if the deletion fails
      // Example: fetch the task list again or restore the deleted task
      // Consider adding logic to re-fetch the tasks or notify the user
    }
  };

  const getIDEdit = (id: string, newText: string, isCheck: boolean): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
    fetch("http://localhost:3000/tasks/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText, isCompleted: isCheck }), //
    });
  };

  const addTask = (): void => {
    if (lastText.trim() !== "") {
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: `${tasks.length + 1}`,
          text: lastText,
          isCompleted: false,
          isEdit: false,
        }),
      });
      const newTask: Task = {
        id: `${tasks.length + 1}`, // Ideally, you would use a unique ID from the backend
        text: lastText,
        isCompleted: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setText("");
    }
  };
  // const inputKey = document.getElementById("onInput");
  document.addEventListener("keydown", (e) => {
    if (e.key == "/") {
      inputFocus.current?.focus();
    }
  });
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
      id="onInput"
    >
      <h2 className="text-3xl font-bold mb-4">To Do Lists</h2>
      <h1 className="text-5xl font-bold mb-4">CRUD</h1>
      <div className="w-full max-w-lg mb-4">
        <input
          ref={inputFocus}
          onChange={getText}
          value={lastText}
          placeholder="Add Task..."
          type="text"
          className="w-full p-2 border rounded mb-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (buttonAdd.current) {
                buttonAdd.current.click();
              }
            }
          }}
        />
        <button
          ref={buttonAdd}
          onClick={addTask}
          className="w-full p-2 bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
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
              // isEdit={Edit}
            />
          ))
        : "Loading..."}
    </div>
  );
};

export default TodoForm;
