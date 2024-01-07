import axios from "axios";
import { useEffect, useReducer, useState } from "react";

const todosReducer = (state, { type, payload }) => {
  switch (type) {
    case "Get_All_Todos":
      return payload;

    case "Create_New_Todos":
      return [...state, payload];

    case "Filter_Todos":
      return payload;

    case "Delete_Todos":
      return payload;

    default:
      return state;
  }
};

const Todos = () => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  const [input, setInput] = useState([
    {
      title: "",
      type: "Pending",
    },
  ]);

  const getAllData = async () => {
    const response = await axios.get("http://localhost:7070/todos");
    dispatch({ type: "Get_All_Todos", payload: response.data });
  };

  const handleDeleteData = async (id) => {
    const response = await axios.delete(`http://localhost:7070/todos/${id}`);
    dispatch({ type: "Delete_Todos", payload: response.data });
    getAllData();
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleCrateData = async () => {
    const response = await axios.post("http://localhost:7070/todos", input);
    dispatch({ type: "Create_New_Todos", payload: response.data });
  };

  const handleDataFilter = async (type) => {
    if (type === "*") {
      const response = await axios.get(`http://localhost:7070/todos`);
      dispatch({ type: "Filter_Todos", payload: response.data });
    } else {
      const response = await axios.get(
        `http://localhost:7070/todos?type=${type}`
      );
      dispatch({ type: "Filter_Todos", payload: response.data });
    }
  };

  const handleInputValue = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container my-5 ">
      <div className="row justify-content-center">
        <div className="col-md-8 bg-light shadow main-colomn">
          {/* First Row */}
          <div className="row">
            <div className="col-md-12 row-header">
              <h2>To Do App</h2>
              {/* Mid Row */}
              <div className="todos-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter A Task Here"
                    name="title"
                    value={input.title}
                    onChange={handleInputValue}
                  />
                </div>
                <div className="form-group">
                  <select
                    name="type"
                    id=""
                    className="form-select form-select-md"
                    value={input.type}
                    onChange={handleInputValue}
                  >
                    <option value="">--Select Status--</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    onClick={handleCrateData}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="filter-button my-3">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleDataFilter("*")}
                >
                  All
                </button>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleDataFilter("Pending")}
                >
                  Pending
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleDataFilter("In Progress")}
                >
                  In Progress
                </button>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleDataFilter("Completed")}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
          {/* Table Row */}
          <div className="row my-2">
            <div className="col-md-12">
              <div className="table-section">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>To Do Item</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todos?.length > 0 ? (
                      todos.map((item, index) => {
                        return (
                          <tr className="align-middle" key={index}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.type}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteData(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colspan="4" className="text-center">
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
