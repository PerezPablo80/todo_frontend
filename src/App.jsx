import { useState } from "react";

import "./App.css";
import List from "./components/List";
import Task from "./components/Task";
import Button from "react-bootstrap/Button";

function App() {
	const [element, setElement] = useState(false);
	const [action, setAction] = useState("add");
	const [message, setMessage] = useState(false);
	const setInformation = (msg) => {
		setMessage(msg);
		setTimeout(() => {
			window.location.reload();
		}, 2000);
	};
	const handleClick = (selected) => {
		setAction("edit");
		setElement(selected);
		setMessage(false);
	};

	return (
		<div className="container-fluid">
			<h2>{message}</h2>
			<div className="row">
				<div className="col">
					<List clicked={handleClick} />
				</div>
				<div className="col">&nbsp;</div>
				<div className="col">
					<h2>Actions</h2>
					<hr />
					<Button className="btn btn-success" onClick={() => setElement(false)}>
						Add new Task
					</Button>
					<br />
					<Button
						className="btn btn-danger"
						onClick={() => {
							setAction("delete");
						}}
					>
						Delete selected Task
					</Button>
				</div>
			</div>
			<Task action={action} task={element} setMessage={setInformation} />
		</div>
	);
}

export default App;
