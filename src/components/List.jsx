import { useEffect, useState } from "react";
import axios from "axios";

function List({ clicked = false }) {
	const [todos, setTodos] = useState([]);
	async function getTodos() {
		try {
			const url = import.meta.env.VITE_BACKEND_URL + "/todo";
			// console.log("URL:", url);
			let resp = await axios.get(url);
			if (resp?.data?.status) {
				setTodos(resp.data.data);
			}
			// console.log(todos);
		} catch (e) {
			console.log(" ERROR on get:", e);
		}
	}
	useEffect(() => {
		getTodos();
	}, []);
	function changeChecked(t) {
		let ts = todos.map((tp) => {
			if (tp.id === t.id) {
				t.completed = !t.completed;
				return t;
			}
			return tp;
		});
		setTodos(ts);
	}

	function generateList() {
		return (
			<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Task</th>
						<th scope="col">Completed</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((t) => {
						return (
							<tr key={t.id}>
								<td scope="row">{t.id}</td>
								<td>{t.task}</td>
								<td>{t.completed ? "Yes" : "No"}</td>

								<td>
									<button className="btn btn-success" onClick={() => clicked(t)}>
										Select
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
	if (todos.length > 0) return generateList();
	else return <>Lista</>;
}
export default List;
