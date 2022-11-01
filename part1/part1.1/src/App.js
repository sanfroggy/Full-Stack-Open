const App = () => {
    //Defining the constants to be passed to different components
    const course = 'Half stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        //Displaying the contents of components
        <>
            <Header course={course} />
            <Content part={part1} exercises={exercises1} />
            <Content part={part2} exercises={exercises2} />
            <Content part={part3} exercises={exercises3} />
            <Total firstnum={exercises1} secondnum={exercises2} thirdnum={exercises3} />
        </>
    )
}

//Defining the Header component
const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

//Defining the Content component
const Content = (props) => {
    return (
        <p>{props.part}: {props.exercises}</p>
    )
}

//Defining the Total component
const Total = (props) => {
    return (
        <p>Number of exercises: {props.firstnum + props.secondnum + props.thirdnum}</p>
    )
}

export default App
