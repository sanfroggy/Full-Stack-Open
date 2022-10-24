const App = () => {
    const course = 'Half stack application development';
    const part1 = 'Fundamentals of React';
    const exercises1 = 10;
    const part2 = 'Using props to pass data';
    const exercises2 = 7;
    const part3 = 'State of a component';
    const exercises3 = 14;

    return (
        <div>
            <Header course={course} />
            <Content first={part1} firstnum={exercises1} second={part2}
                secondnum={exercises2} third={part3} thirdnum={exercises3} />
            <Total firstnum={exercises1} secondnum={exercises2} thirdnum={exercises3} />
        </div>
    )
}

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    );
}

const Content = (props) => {
    return (
        <>
            <Part part={props.first} exercises={props.firstnum} />
            <Part part={props.second} exercises={props.secondnum} />
            <Part part={props.third} exercises={props.thirdnum} />
        </>
    );
}

const Part = (props) => {
    return (
        <>
            <p>{props.part}: {props.exercises}</p>
        </>
    );
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises: {props.firstnum + props.secondnum + props.thirdnum}</p>
        </>
    )
}

export default App;
