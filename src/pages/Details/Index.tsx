import Button from '../../components/Button';

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
    <section className="bg-slate-100 w-full h-screen flex flex-col">
      <h1 className="text-slate-800 text-3xl font-bold mx-auto py-3">
        Detail Todo
      </h1>
      <div className="mx-auto mt-24 md:w-[500px] bg-slate-50 shadow-lg rounded p-4">
        <div>
          <p className="text-lg font-semibold mb-2">Task Content:</p>
          {isEditMode ? (
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <p className=" bg-white shadow rounded py-2 px-3">{taskContent}</p>
          )}
        </div>
        <div className="mt-3">
          <p className="text-lg font-semibold mb-2">Description:</p>
          {isEditMode ? (
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          ) : (
            <p className=" bg-white shadow rounded py-2 px-3">{description}</p>
          )}
        </div>
        <div className="mt-3">
          {isEditMode ? (
            <div>
              <Button id="save" label="Save" onClick={handleSave} />
              <button
                id="cancel"
                onClick={handleCancel}
                className="w-24 bg-red-600 text-white rounded hover:bg-red-700 font-semibold h-8 mx-1"
              >
                Cancel
              </button>
            </div>
          ) : (
            <Button id="edit" label="Edit" onClick={handleToggleEdit} />
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailTodo;
