// src/ToDoList.js
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const ToDoList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <ListGroup className="mt-3">
      {tasks.map((task) => (
        <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
          {task.name} - {task.date} {task.time && `- ${task.time}`}
          <div>
            {task.status === 'unfinished' && (
              <>
                <Button variant="success" onClick={() => updateTask(task.id, 'finished')}>
                  Selesai
                </Button>{' '}
                <Button variant="danger" onClick={() => deleteTask(task.id)}>
                  Hapus
                </Button>
              </>
            )}
            {task.status === 'finished' && (
              <Button variant="warning" onClick={() => updateTask(task.id, 'unfinished')}>
                Belum Selesai
              </Button>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ToDoList;
