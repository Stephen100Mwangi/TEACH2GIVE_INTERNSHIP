interface Props {
    size:number
}

const SizeCardComponent = (props: Props) => {
    return (
        <div className='p-2.5 max-sm:text-xs max-sm:p-2 text-sm font-bold text-black bg-gray'>
            {props.size}
        </div>
    )
}

export default SizeCardComponent
