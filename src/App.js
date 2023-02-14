import "./App.css"
import React, { useState, useEffect, createContext } from "react"

import avatar from "./assets/Bitmap.png"
import Header from "./Header"
import Form from "./Form"
import Main from "./Main"

export const ThemeContext = createContext(null)

function App() {
	const [theme, setTheme] = useState("dark")
	const [query, setQuery] = useState("octocat")
	const [data, setData] = useState("")
	const [previousData, setPreviousData] = useState("")
	const [notFound, setNotFound] = useState(false)
	// https://api.github.com/users/octocat
	const api = `https://api.github.com/users/`

	const toggleTheme = () => {
		setTheme((curr) => (curr === "light" ? "dark" : "light"))
		console.log(theme)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setQuery(e.target[0].value)
	}

	useEffect(() => {
		if (!query) {
			setQuery("octocat")
		}

		try {
			const fetchUser = async () => {
				const response = await fetch(`${api}${query}`)
				const result = await response.json()
				if (!result.message) {
					setNotFound(false)
					setData(result)
					setPreviousData(result)
					console.log(result)
				} else {
					setNotFound(true)
					setData(previousData)
				}
			}
			fetchUser()
		} catch (error) {
			console.log(error)
		}
	}, [query])

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<div className="App" id={theme}>
				{query ? (
					<div className="github-app">
						<Header toggleTheme={toggleTheme} theme={theme} />
						<Form handleSubmit={handleSubmit} notFound={notFound} />
						<Main data={data} />
					</div>
				) : (
					<div>dont have</div>
				)}
			</div>
		</ThemeContext.Provider>
	)
}

export default App
