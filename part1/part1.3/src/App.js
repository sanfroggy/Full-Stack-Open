const App = () => {
    /*Defining the parts of the course as objects. The properties of the objects are to be
    passed to different components as well as the name of the course*/
    const course = 'Half stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        //Displaying the contents of components
        <div>
            <Header course={course} />
            <Content first={part1.name} firstnum={part1.exercises} second={part2.name}
                secondnum={part2.exercises} third={part3.name} thirdnum={part3.exercises} />
            <Total firstnum={part1.exercises} secondnum={part2.exercises} thirdnum={part3.exercises} />
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
        <Part part={props.first} exercises={props.firstnum} />
        <Part part={props.second} exercises={props.secondnum} />
        <Part part={props.third} exercises={props.thirdnum} />
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
        <p>Number of exercises: {props.firstnum + props.secondnum + props.thirdnum}</p>
    )
}

export default App
