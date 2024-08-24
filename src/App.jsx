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
	function able(boo, id) {
		let tr = document.getElementById(id);
		tr.disabled = boo;
		console.log('id":' + id);
	}
	return (
		<div>
			<div className="container-fluid">
				<h2>{message}</h2>
				<div className="row">
					<div className="col-lg-6">
						<List clicked={handleClick} />
					</div>
					<div className="col-lg-2 grey">
						<h2>Actions</h2>
						<hr />
						<Button className="btn btn-success" id="btnAdd" onClick={() => setElement(false)}>
							Add new Task
						</Button>
						<br />
						<Button
							id="btnDelete"
							className="btn btn-danger"
							onClick={() => {
								able(false, "btnDelete");
								able(false, "btnAdd");
								setAction("delete");
								able(true, "btnDelete");
								able(true, "btnAdd");
							}}
						>
							Delete selected Task
						</Button>
					</div>
					<div className="col-lg-4">
						<Task action={action} task={element} setMessage={setInformation} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
