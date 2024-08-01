import React from "react";

interface Tasks {
  id: string;
  text: string;
  isCompleted: boolean;
  getID: (id: string) => void;
  editID: (id: string, newText: string, isCheck: boolean) => void;
  // isEdit: boolean;
}

const TodoList: React.FC<Tasks> = ({
  id,
  text,
  isCompleted,
  getID,
  editID,
  // isEdit,
}) => {
  const [isCheck, setCheck] = React.useState(isCompleted);
  const [isEdit1, setEdit1] = React.useState(false);
  const [lastText, setText] = React.useState(text);

  const handleCheck = () => {
    setCheck(!isCheck);
  };

  const handleEditToggle = () => {
    setEdit1(!isEdit1);
    if (isEdit1) {
      setText(text); // Reset text to original if edit is cancelled
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    editID(id, lastText, isCheck);
    setEdit1(false);
  };

  const handleRemove = () => {
    getID(id);
  };

  return (
    <article className="flex items-center justify-between w-full max-w-lg bg-white shadow-md p-4 rounded-lg mb-4 ring-8 hover:scale-105">
      <div className="flex items-center">
        {isEdit1 ? (
          <input
            type="checkbox"
            checked={isCheck}
            onChange={handleCheck}
            className="mr-4 h-6 w-6"
          />
        ) : (
          ""
        )}
        {isEdit1 ? (
          <input
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSave();
              }
            }}
            onChange={handleTextChange}
            value={lastText}
            type="text"
            className="w-full p-2 border rounded mb-2"
          />
        ) : (
          <h3
            className={`${isCheck ? "line-through text-gray-500" : ""} text-lg`}
          >
            {lastText}
          </h3>
        )}
      </div>

      {isEdit1 ? (
        <>
          <button
            onClick={handleEditToggle}
            className="p-2 bg-red-600 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="p-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="text-lg">{isCheck ? "Completed" : "Pending"}</h3>
          <button
            onClick={handleEditToggle}
            className="p-2 bg-blue-600 text-white rounded"
          >
            Edit
          </button>
        </>
      )}

      <button
        onClick={handleRemove}
        className="p-2 bg-red-600 text-white rounded"
      >
        Remove
      </button>
    </article>
  );
};

export default TodoList;
