//Actions: add/modify/delete
function Task({ action = "add", task = false }) {
	function handleSubmit(event) {
		event.preventDefault();
		console.log(event.currentTarget.elements.usernameInput.value);
	}
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="usernameInput">Username:</label>
				<input id="usernameInput" name="inputname" type="text" />
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}
export default Task;
