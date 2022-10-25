const App = () => {
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
        <div>
            <Header course={course} />
            <Content first={part1.name} firstnum={part1.exercises} second={part2.name}
                secondnum={part2.exercises} third={part3.name} thirdnum={part3.exercises} />
            <Total firstnum={part1.exercises} secondnum={part2.exercises} thirdnum={part3.exercises} />
        </div>
    )
}

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <>
        <Part part={props.first} exercises={props.firstnum} />
        <Part part={props.second} exercises={props.secondnum} />
        <Part part={props.third} exercises={props.thirdnum} />
        </>
    )
}

const Part = (props) => {
    return (
        <p>{props.part}: {props.exercises}</p>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises: {props.firstnum + props.secondnum + props.thirdnum}</p>
    )
}

export default App
