import Input from '../../components/Input';
import Button from '../../components/Button';

import Swal from 'sweetalert2';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState('');
  const navigate = useNavigate();

  const [description, setDescription] = useState('');

  const getTodo = () => {
    axios
      .get(`https://api.todoist.com/rest/v2/tasks/`, {
        headers: {
          Authorization: `Bearer 3ff9cbcc2fae488db6dad46e0b7ecb74c1dc1946`,
        },
      })
      .then((response) => {
        setTasks(response?.data);
        console.log(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    axios
      .post(
        'https://api.todoist.com/rest/v2/tasks',
        {
          content: addTask,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer 3ff9cbcc2fae488db6dad46e0b7ecb74c1dc1946`,
          },
        }
      )
      .then(() => {
        setAddTask('');
        setDescription('');
        Swal.fire({
          icon: 'success',
          title: 'Task Added Successfully!',
          confirmButtonText: 'OK',
        }).then((response) => {
          if (response.isConfirmed) {
            getTodo();
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (taskId: number) => {
    axios
      .delete(`https://api.todoist.com/rest/v2/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer 3ff9cbcc2fae488db6dad46e0b7ecb74c1dc1946`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Task Deleted Successfully!',
          confirmButtonText: 'OK',
        }).then((response) => {
          if (response.isConfirmed) {
            getTodo();
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <section className=" w-full h-screen flex flex-col">
      <div className="mx-auto my-2">
        <h1 className="text-3xl font-bold text-slate-800 md:text-center">
          TODO APP
        </h1>
      </div>
      <div className="md:mx-auto sm:mx-0 sm:w-full md:w-[950px] shadow bg-slate-100">
        <p className="bg-stone-200 font-semibold py-1 pl-3 text-slate-700 ">
          Add Task
        </p>
        <div className="px-3 py-2 ">
          <Input
            id="input"
            name="text"
            type="text"
            placeholder="Add Task"
            value={addTask}
            onChange={(e) => setAddTask(e.target.value)}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow rounded my-1 w-full h-16 py-2 px-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          ></textarea>
          <Button id="submit" label="Submit" onClick={handleSubmit} />
        </div>
        <div className="mt-3">
          <p className="bg-stone-200 font-semibold py-1 pl-3 text-slate-700">
            Task
          </p>
          <ul>
            {tasks.map((item: any, index) => (
              <li className="flex justify-between py-2 px-3 " key={index}>
                <div className="w-full p-2">{item.content}</div>
                <div className=" flex flex-col md:flex-row">
                  <button
                    className="w-24 bg-green-600 text-white rounded hover:bg-green-700 font-semibold h-8 m-1"
                    onClick={() =>
                      navigate(`/details/${item.id}`, {
                        state: {
                          taskContent: item.content,
                          id: item.id,
                        },
                      })
                    }
                  >
                    Update
                  </button>
                  <button
                    id={`delete-${item.id}`}
                    className="w-24 bg-red-600 text-white rounded hover:bg-red-700 font-semibold h-8 m-1"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
