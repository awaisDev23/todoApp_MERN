import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Checkbox } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import axios from "axios";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "3px",
    alignItems: "center",
  },
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "1rem",
    backgroundColor: "white",
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    margin: "0.5rem 0",
  },
  button: {
    marginLeft: "0.5rem",
  },
};

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [toEdit, setToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [num, setNum] = useState(0);
  console.log({ todos });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    console.log("fetched");
    try {
      const response = await axios.get("http://localhost:5005/gettodo");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(todoText);
      const response = await axios.post("http://localhost:5005/addtodo", {
        title: todoText,
        checked: false,
      });

      setTodos([...todos, response.data]);
      setTodoText("");
      handleClose();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleEditSubmit = async (todoId) => {
    console.log(todos[todoId]?._id);
    var todoId = todos[todoId]?._id;
    console.log("todoId", typeof todoId);
    try {
      const response = await axios.put(
        `http://localhost:5005/edittodo/${encodeURIComponent(todoId)}`,
        {
          todoId,
          checked: false,
          title: todoText,
        }
      );

      setToEdit(null);
      // setTodoText(response);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (todoId) => {
    const todoId1 = todos[todoId]?._id;
    console.log(typeof todoId);
    console.log(todoId1);
    try {
      await axios.delete(
        `http://localhost:5005/deletetodo/${todoId1}`,

        {
          todoId1,
        }

        // todos[num]._id //Req,body.Object
      );
      // console.log(
      //   "type",
      //   typeof {
      //     todoId: todos[num]._id,
      //   }
      // );
      const updatedTodos = todos.filter((todo) => todo._id !== todoId);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCheck = async (todoId) => {
    console.log("handlecheckID:", todoId);
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo._id === todoId) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });

      setTodos(updatedTodos);

      await axios.put(`http://localhost:5005/handlecheck/${todoId}`);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteChecked = async () => {
    try {
      const checkedTodoIds = todos
        .filter((todo) => todo.checked)
        .map((todo) => todo._id);

      await axios.delete("http://localhost:5005/deletemany", {
        data: { todoIds: checkedTodoIds },
      });

      const updatedTodos = todos.filter((todo) => !todo.checked);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting checked todos:", error);
    }
  };

  const handleEditChange = (index) => {
    setToEdit(true);
    setNum(index);
  };

  return (
    <div style={styles.container}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        onClick={handleOpen}
      >
        Add Todo
      </Button>

      <Modal open={open} onClose={handleClose} style={styles.modalContainer}>
        <div style={styles.form}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Todo"
              value={todoText}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={styles.button}
            >
              Add
            </Button>
          </form>
        </div>
      </Modal>

      {toEdit && (
        <div
          style={styles.modalContainer}
          onClose={(e) => {
            setToEdit({ title: e.target.value });
          }}
        >
          <div style={styles.form}>
            <TextField
              label="Edit TODO..."
              value={todoText}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={styles.button}
              onClick={() => handleEditSubmit(num)}
            >
              Update
            </Button>
          </div>
        </div>
      )}

      <div style={styles.container}>
        {todos.map((todo, index) => (
          <div key={todo._id} style={styles.todoItem}>
            <Checkbox
              checked={todo.checked}
              onChange={() => handleCheck(todo._id)}
              style={{ marginRight: "0.5rem" }}
            />
            <span
              style={{
                textDecoration: todo.checked ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={styles.button}
              onClick={() => handleEditChange(index)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              style={styles.button}
              onClick={() => handleDelete(num.toString())}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>

      {todos.some((todos) => todos?.checked) && (
        <Button
          variant="contained"
          color="secondary"
          style={styles.button}
          onClick={handleDeleteChecked}
        >
          Delete Checked
        </Button>
      )}

      {todos.length === 0 && <p>List Goes here</p>}
    </div>
  );
};

export default TodoApp;
