import Course from './components/Course'

const App = () => {
    /*Defining the course as a single object. The properties of this object are to be
   passed to the Course component. */

    const courses = [
        {
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
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        //Displaying the contents of components
        <div>
            <h1>Web Development Curriculum</h1>
            {courses.map(course =>
                <Course key={course.id} course={course} />
            )}
        </div>
    )
}

export default App
