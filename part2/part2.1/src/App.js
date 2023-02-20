const App = () => {
    /*Defining the course as a single object. The properties of this object are to be
   passed to the Course component*/
    const course = {
        name: 'Half stack application development',
	id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
	    	id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
		id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
		id: 3
            }
        ]
    }

    return (
        //Displaying the contents of components
        <div>
            <Course course={course} /> 
        </div>
    )
}

//Defining the Course component
const Course = ({course}) => {
	return (
        <>
		<Header course={course.name} />
		<Content parts={course.parts} />
        </>
    )
}

//Defining the Header component
const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

//Defining the Content component that uses Part components to display data
const Content = (props) => {
    return (
        <>
		{props.parts.map(part =>
		<Part key={part.id} part={part.name} exercises={part.exercises} />
		)}
        </>
    )
}

//Defining the Part component
const Part = (props) => {
    return (
        <p>{props.part}: {props.exercises}</p>
    )
}

export default App
