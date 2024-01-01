// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs } from 'react-bootstrap';
import ToDoList from './ToDoList';
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', date: '', time: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost/api/tasks.php');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post('http://localhost/api/tasks.php', newTask);
      setNewTask({ name: '', date: '', time: '' });
      fetchTasks();
      toast.success('Kegiatan ditambahkan!');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Gagal menambahkan kegiatan.');
    }
};

const updateTask = async (id, status) => {
  try {
    await axios.put(`http://localhost/api/tasks.php?id=${id}`, { status });
    fetchTasks();
    toast.success('Status kegiatan diperbarui!');
  } catch (error) {
    console.error('Error updating task:', error);
    toast.error('Gagal memperbarui status kegiatan.');
  }
};

const deleteTask = async (id) => {
  try {
    await axios.delete(`http://localhost/api/tasks.php?id=${id}`);
    fetchTasks();
    toast.success('Kegiatan dihapus!');
  } catch (error) {
    console.error('Error deleting task:', error);
    toast.error('Gagal menghapus kegiatan.');
  }
};

  return (
    <div className="container mt-4">

      <div className="mt-4 mb-4">
        <h3>Tambah Kegiatan</h3>
        <div className="mb-3">
          <label>Nama Kegiatan:</label>
          <input
            type="text"
            className="form-control"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Tanggal:</label>
          <input
            type="date"
            className="form-control"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Waktu:</label>
          <input
            type="time"
            className="form-control"
            value={newTask.time}
            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
          />
        </div>
        <button className="btn btn-primary" onClick={addTask}>
          Tambahkan
        </button>
      </div>
      <Tabs defaultActiveKey="unfinished" id="tasks-tabs">
        <Tab eventKey="unfinished" title="Belum Selesai">
          <ToDoList
            tasks={tasks.filter((task) => task.status === 'unfinished')}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </Tab>
        <Tab eventKey="finished" title="Sudah Selesai">
          <ToDoList
            tasks={tasks.filter((task) => task.status === 'finished')}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
