const App = () => {
     /*Defining the parts of the course as an object. The properties of this object are to be
    passed to different components as well as the name of the course*/
    const course = 'Half stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        //Displaying the contents of components
        <div>
            <Header course={course} />
            <Content parts={parts}/>
            <Total parts={parts} />
        </div>
    )
}

//Defining the Header component
const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

//Defining the Content component that uses three Part components to display data
const Content = (props) => {
    return (
        <>
        <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
        <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
        <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
        </>
    )
}

//Defining the Part component
const Part = (props) => {
    return (
        <p>{props.part}: {props.exercises}</p>
    )
}

//Defining the Total component
const Total = (props) => {
    return (
        <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
}

export default App
