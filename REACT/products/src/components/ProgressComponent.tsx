interface Props {
    color?:string
}

const ProgressComponent = (props: Props) => {
    return (
        <div className={`size-5 rounded-full border border-1 bg-${props.color}`}>
            
        </div>
    )
}

export default ProgressComponent
