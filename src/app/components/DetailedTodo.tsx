import { Box, Skeleton } from "@mui/material";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useEditTodo, useRemoveTodo, useTodo } from "../../data/hooks";
import { getCurrentColor } from "../../data/utils/getCurrentColor";
import BackLink from "./BackLink";
import { ConfirmModal } from "./ConfirmModal";
import CreateTodoForm from "./CreateTodoForm";

export const DetailedTodo = () => {
  const { todoId = "" } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEditTodoForm, setShowEditTodoForm] = useState(false);

  const { data: todo, isLoading: todoIsLoading } = useTodo(todoId);
  const { mutate: removeTodo, isLoading: removeTodoIsLoading } =
    useRemoveTodo();
  const { mutate: editTodo, isLoading: editTodoIsLoading } = useEditTodo();

  return (
    <>
      <div>
        <BackLink text="Go back" to="/todos" />

        {!!(todoIsLoading && !todo) ? (
          <Skeleton
            className="m-auto"
            sx={{
              bgcolor: "darkgrey",
              opacity: "0.5",
              display: "block",
              width: "100%",
            }}
            variant="rounded"
            height={400}
            width={600}
          />
        ) : (
          <Box
            // className={`${getCurrentColor()[todo?.data?.category]}`}
            className="flex flex-col justify-between mb-2 last-of-type:mb-0 text-white items-start w-600 mx-auto py-8 px-6
          bg-dark  rounded-md "
          >
            <div
              className={`flex items-center w-full bg-yellow-300 px-4 py-6 rounded-md mb-5 overflow-hidden text-white ${
                getCurrentColor()[todo.data.category]
              }`}
            >
              <p className="text-xl font-bold capitalize">
                {todo?.data?.category}
              </p>
              {todo?.data?.completed && (
                <IoCheckmarkDoneSharp size={25} className="ml-5" />
              )}
            </div>

            <div className="mb-8 flex flex-col text-l w-full ">
              <div className="flex items-center mb-4 gap-4">
                <p className="font-semibold w-50">Title:</p>{" "}
                <p>{todo?.data?.title}</p>
              </div>
              <div className="flex items-center mb-4 gap-4">
                <p className="font-semibold w-50">Description:</p>{" "}
                <p>{todo?.data?.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold w-50">Created at:</p>{" "}
                <p>{todo?.data?.createdAt}</p>
              </div>
            </div>

            <div className="flex flex-nowrap gap-4 ml-auto">
              <div
                className={`p-0.5  rounded-md ${
                  getCurrentColor()[todo.data.category]
                }`}
              >
                <button
                  onClick={() =>
                    editTodo({
                      id: todoId,
                      values: {
                        ...todo.data,
                        completed: !todo.data.completed,
                      },
                    })
                  }
                  className="flex items-center justify-center py-3 px-5 rounded-md text-white font-medium bg-dark whitespace-nowrap"
                >
                  {todo.data.completed ? "Mark as uncompleted" : "Mark as done"}
                </button>
              </div>

              <div
                className={`p-0.5  rounded-md ${
                  getCurrentColor()[todo.data.category]
                }`}
              >
                <button
                  onClick={() =>
                    // editTodo({
                    //   id: todoId,
                    //   values: {
                    //     ...todo.data,
                    //     completed: !todo.data.completed,
                    //   },
                    //   params: {
                    //     completed: todo.data.completed ? "true" : "false",
                    //     category: todo.data.category,
                    //   },
                    // })
                    setShowEditTodoForm(true)
                  }
                  className="flex gap-2 items-center justify-center py-3 px-5  rounded-md text-white font-medium bg-dark  w-full"
                >
                  <span>Edit</span>
                  <FiEdit2 size={22} />
                </button>
              </div>
              <div
                className={`p-0.5  rounded-md ${
                  getCurrentColor()[todo.data.category]
                } `}
              >
                <button
                  onClick={() => setShowModal(true)}
                  className="flex gap-2 items-center justify-center py-3 px-5  rounded-md text-white font-medium bg-dark w-full"
                >
                  <span>Delete</span>
                  <BsTrash size={22} />
                </button>
              </div>
            </div>
          </Box>
        )}
      </div>
      <ConfirmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        text={"Are you sure you want to delete this item?"}
        handleConfirm={() => {
          removeTodo(todoId, {
            onSuccess: () => navigate("/todos"),
          });
        }}
        confirmBtnText="Remove"
        handleReject={() => setShowModal(false)}
        isLoading={removeTodoIsLoading}
      />
      <CreateTodoForm
        openModal={showEditTodoForm}
        closeModal={() => {
          setShowEditTodoForm(false);
        }}
        initialValue={{ ...todo?.data, id: todo?.data._id || todo?.data.id }}
        searchParams={{
          completed: todo?.data.completed ? "true" : "false",
          category: todo?.data.category || "",
        }}
      />
    </>
  );
};
