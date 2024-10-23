interface Props {
    size:number
}

const SizeCardComponent = (props: Props) => {
    return (
        <div className='p-2.5 text-sm font-bold text-black bg-gray'>
            {props.size}
        </div>
    )
}

export default SizeCardComponent
