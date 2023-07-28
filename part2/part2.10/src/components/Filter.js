const Filter = (props) => {
    return (
        <div>
            Filter names: <input value={props.showNames} onChange={props.handleFilterInputChangeMethod} />
        </div>
    )
}

export default Filter
