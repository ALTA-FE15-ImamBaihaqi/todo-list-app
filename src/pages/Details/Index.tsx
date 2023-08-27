import Swal from 'sweetalert2';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DetailTodo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.state?.id;

  const [taskContent, setTaskContent] = useState('');
  const [description, setDescription] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const getTask = (taskId: number) => {
    axios
      .get(`https://api.todoist.com/rest/v2/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer 3ff9cbcc2fae488db6dad46e0b7ecb74c1dc1946`,
        },
      })
      .then((response) => {
        setTaskContent(response?.data.content);
        setDescription(response?.data.description);
        setEditedContent(response?.data.content);
        setEditedDescription(response?.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = () => {
    axios
      .post(
        `https://api.todoist.com/rest/v2/tasks/${id}`,
        {
          content: editedContent,
          description: editedDescription,
        },
        {
          headers: {
            Authorization: `Bearer 3ff9cbcc2fae488db6dad46e0b7ecb74c1dc1946`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Task Saved Successfully!',
          confirmButtonText: 'OK',
        }).then((response) => {
          if (response.isConfirmed) {
            navigate('/');
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    setEditedContent(taskContent);
    setEditedDescription(description);
    setIsEditMode(false);
  };

  useEffect(() => {
    if (id) {
      getTask(id);
    }
  }, [id]);

  return (
    <section className=" w-full flex flex-col">
      <h1 className="text-slate-800 text-3xl font-bold mx-auto py-3">
        Detail Todo
      </h1>
      <div className="mx-auto mt-24 w-full md:w-[500px] bg-slate-100 shadow-lg rounded p-4">
        <div>
          <p className="text-lg font-semibold mb-2">Task Content:</p>
          {isEditMode ? (
            <input
              type="text"
              className="w-full px-3 py-2 rounded"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <p className="w-full bg-white shadow rounded py-2 px-3">
              {taskContent}
            </p>
          )}
        </div>
        <div className="mt-3">
          <p className="text-lg font-semibold mb-2">Description:</p>
          {isEditMode ? (
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="shadow rounded w-full h-16 py-2 px-3 text-slate-700 "
            ></textarea>
          ) : (
            <p className=" bg-white shadow rounded py-2 px-3 h-16">
              {description}
            </p>
          )}
        </div>
        <div className="mt-3 ">
          {isEditMode ? (
            <div className="-mt-1 -mb-0.5">
              <button
                id="save"
                onClick={handleSave}
                className="w-20 bg-green-700 text-white rounded hover:bg-green-500 font-semibold h-8 my-1 ml-2"
              >
                Save
              </button>
              <button
                id="cancel"
                onClick={handleCancel}
                className="w-20 bg-red-700 text-white rounded hover:bg-red-500 font-semibold h-8 my-1 ml-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button
                id="edit"
                onClick={handleToggleEdit}
                className="w-20 bg-green-700 text-white rounded hover:bg-green-500 font-semibold h-8 my-1 ml-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailTodo;
