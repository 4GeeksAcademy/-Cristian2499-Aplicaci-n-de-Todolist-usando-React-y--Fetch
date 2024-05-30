import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { element } from "prop-types";

//create your first component
const Home = () => {
	const apiUrl = "https://playground.4geeks.com/todo"
	const [taskList, setTaskList] = useState([]);
	const [task, setTask] = useState({
		label: "",
		is_done: false
	});

	async function getInfo() {
		try {
			const response = await fetch(apiUrl+"/users/Cristian2499");
			const infoTasks = await response.json();
			if (response.ok) {
				setTaskList(infoTasks.todos);
			} else if(response.status === 404) {
				createUser();
			};
		} catch (e) {
			console.log(e)
		}
	};

	async function createUser() {
			const response = await fetch(apiUrl+"/users/Cristian2499", {method: "POST",})
			const data = await response.json()
			if (response.ok) {
				getInfo();
			}	
	};

	async function addTask(e) {
		if (e.key === "Enter" && e.target.value !== "") {
			console.log(e.key)
			const response = await fetch(apiUrl+"/todos/Cristian2499", {
				method: "POST",
				body: JSON.stringify(task),
				headers: {
					'Content-type': 'application/json'
				}
			})
			console.log(response)
			const data = await response.json()
			if (response.ok) {
				getInfo()
			}
		}
	};

	async function deleteTask(id) {
		const response = await fetch(apiUrl+"/todos/"+id, {method: "DELETE",})
		const data = await response
		if (response.ok) {
			console.log(data)
			getInfo()
		}	
	};

	async function deleteUser() {
		const response = await fetch(apiUrl+"/users/Cristian2499", {method: "DELETE",})
		const data = await response
		if (response.ok) {
			console.log(data)
			getInfo()
		}	
	};

	function handleChange(e) {
		setTask({ ...task, [e.target.name]: e.target.value })
	};

	useEffect(() => {
		getInfo();
	}, []);

	return (
		<div className="container">
			<h1 className="text-center mt-5">Todolist</h1>
			<div className="card">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						value={task.label}
						name="label"
						onChange={(event) => handleChange(event)}
						onKeyDown={(event) => addTask(event)}
						placeholder="Agrega una tarea"
					/>
				</div>
				<ul className="list-group">
					{taskList.length > 0 ? taskList.map(item => {
						return (
							<li className="list-group-item d-flex justify-content-between align-item-center" key={item.label + item.id}>
								<span>{item.label}</span>
								<button className="btn btn-danger" onClick={() => deleteTask(item.id)}>X</button>
							</li>
						)
					})
					:
					<li className="list-group-item">
								No hay tareas
							</li>
					}
				</ul>
				<div className="card-footer">
					{taskList.length > 0 ? taskList.length + " tasks left" : "No tasks"}
				</div>
			</div>
			<div className="d-flex justify-content-center">
				<button className="btn btn-danger mt-1" onClick={() => deleteUser()} >Eliminar todas las tareas</button>
			</div>
		</div>
		
	);
};

export default Home;
