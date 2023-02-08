import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { BsList, BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { Todo, TodoCategory, TodosSearchParams } from "../../data/utils/types";
import { ConfirmModal } from "./ConfirmModal";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getCurrentColor } from "../../data/utils/getCurrentColor";
import { useEditTodo, useRemoveTodo } from "../../data/hooks";

const StyledCheckBox = styled(Checkbox)({
  color: "#fff",
  padding: 0,

  "&.Mui-checked": { color: "#fff" },
});

interface TodoListProps {
  todos: Todo[];
  setTodoToEdit: (todo: Todo) => void;
  openModal: () => void;
  searchParams?: TodosSearchParams;
}

const TodoList = ({
  todos,
  setTodoToEdit,
  openModal,
  searchParams,
}: TodoListProps) => {
  const navigate = useNavigate();

  const [todoToRemove, setTodoToRemove] = useState<Todo | null>(null);

  const { mutate: removeTodo, isLoading: removeTodoIsLoading } =
    useRemoveTodo();
  const { mutate: editTodo, isLoading: editTodoIsLoading } = useEditTodo();

  return (
    <>
      <div className="flex flex-col w-full nth-2n:text-white overflow-x-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex justify-between w-full py-4 px-4 rounded  mb-2 text-white items-start hover:shadow-hover ${
              getCurrentColor()[todo.category as TodoCategory]
            }`}
            data-testid="todo-item"
            id={todo.id}
          >
            <div className="flex gap-2 items-start">
              <StyledCheckBox
                id="todo-checked"
                checked={todo.completed}
                onClick={() =>
                  editTodo({
                    id: todo.id,
                    values: {
                      ...todo,
                      completed: !todo.completed,
                    },
                    params: searchParams,
                  })
                }
              />
              <div className="text-start">
                <p className="font-semibold">{todo.title}</p>
              </div>
            </div>
            <div className="flex gap-3 items-center cursor-pointer">
              <BsTrash
                onClick={() => setTodoToRemove(todo)}
                size={22}
                id="delete-todo-btn"
              />

              <FiEdit2
                size={22}
                onClick={() => {
                  setTodoToEdit(todo);
                  openModal();
                }}
                data-testid="edit-todo-btn"
                id="edit-todo-btn"
                type="button"
              />
              <BsList onClick={() => navigate(`${todo.id}`)} size={22} />
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal
        open={!!todoToRemove}
        onClose={() => setTodoToRemove(null)}
        text={"Are you sure you want to delete this item?"}
        handleConfirm={() => {
          removeTodo(todoToRemove?.id || "", {
            onSuccess: () => setTodoToRemove(null),
          });
        }}
        confirmBtnText="Remove"
        handleReject={() => setTodoToRemove(null)}
        isLoading={removeTodoIsLoading}
      />
    </>
  );
};

export default TodoList;
