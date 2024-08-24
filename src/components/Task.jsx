import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState } from "react";
//Actions: add/modify/delete
function Task({ action = "add", task = false, setMessage = false }) {
	const { register, handleSubmit, watch, setValue } = useForm();
	const [title, setTitle] = useState("");
	function onSubmit(data) {
		if (action === "add") {
			axios
				.post(import.meta.env.VITE_BACKEND_URL + "/todo", { data: data })
				.then(function (response) {
					setMessage("Task added, System will  refresh.");
				})
				.catch((e) => {
					console.log("error adding task:");
					console.log(e);
				});
		} else {
			if (action === "edit") {
				axios
					.put(import.meta.env.VITE_BACKEND_URL + "/todo", { data: data })
					.then(function (response) {
						setMessage("Task edition completed, System will refresh.");
						console.log(response);
					})
					.catch((e) => {
						console.log("error editing task:");
						console.log(e);
					});
			} else {
				alert("No action selected, please verify and try again");
			}
		}
	}
	if (action === "delete") {
		if (task) {
			action = "";
			axios
				.delete(import.meta.env.VITE_BACKEND_URL + "/todo", { data: task })
				.then(function (response) {
					setMessage("Delete of task done. System will refresh");
				})
				.catch((e) => {
					console.log("Error deleting:", e);
					setMessage("Delete of task with error. System will  refresh");
				});
		} else {
			alert("You need to select a Task in order to delete it");
		}
	}
	useEffect(() => {
		if (action === "edit" || action === "delete") {
			if (task) {
				setValue("task", task.task);
				setValue("completed", task.completed);
				setValue("id", task.id);
				if (action === "edit") {
					setTitle("Edit Task");
				} else {
					if (action === "delete") {
						setTitle("Delete Task");
					}
				}
			}
		}
		if (action === "add") {
			setTitle("Add new task");
		}
	}, [task, action]);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<h3>{title}</h3>
			{action !== "add" && (
				<Form.Group className="mb-3" controlId="Form.TextArea1" hidden={true}>
					<Form.Label>Id</Form.Label>
					<Form.Control as="input" {...register("id")} />
				</Form.Group>
			)}
			<Form.Group className="mb-3" controlId="Form.TextArea1">
				<Form.Label>Task</Form.Label>
				<Form.Control as="textarea" rows={3} {...register("task")} />
			</Form.Group>
			<Form.Group className="mb-3" controlId="Form.ControlInput1">
				<Form.Check // prettier-ignore
					type="switch"
					id="custom-switch"
					label="Completed"
					{...register("completed")}
				/>
			</Form.Group>
			<Form.Group>
				<Button variant="success" type="submit">
					Submit
				</Button>
			</Form.Group>
		</Form>
	);
}
export default Task;
