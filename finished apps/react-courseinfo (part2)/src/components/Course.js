/* Defining the Course component. Also creating a function for calculating
the total number of exercises using reduce and adding it's return value to the Content component.*/
const Course = ({ course }) => {

    const calculateTotal = () => {
        const sum = course.parts.reduce((a, b) => a + b.exercises, 0)
        return sum
    }

    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} total={calculateTotal()} />
        </>
    )
}

//Defining the Header component
const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}

//Defining the Content component that uses Part components to display data
const Content = (props) => {

    return (
        <>
            {props.parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            )}
            <Total total={props.total} />
        </>
    )
}

//Defining the Part component
const Part = (props) => {
    return (
        <p>{props.part}: {props.exercises}</p>
    )
}

const Total = (props) => {

    return (
        <b> Total:  {props.total} </b>
    )
}

export default Course
