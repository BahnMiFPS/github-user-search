import React from "react"
import search from "./assets/icon-search.svg"

function Form({ handleSubmit, notFound }) {
	return (
		<form className="search-bar" onSubmit={handleSubmit}>
			<div>
				<img src={search} />
				<input
					type="text"
					name="search"
					id=""
					placeholder="Search GitHub username..."
					className="search-input"
				/>
			</div>
			{notFound ? <span className="no-result">No results</span> : ""}
			<button type="submit" className="search-btn">
				Search
			</button>
		</form>
	)
}

export default Form
