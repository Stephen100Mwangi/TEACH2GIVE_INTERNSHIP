interface Props {
    color:string
}

const ColorComponent = (props: Props) => {
    return (
        <div className={`size-8 rounded-full bg-${props.color}`}>
            
        </div>
    )
}

export default ColorComponent
