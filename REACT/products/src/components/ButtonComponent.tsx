interface Props {
    text:string
}

const ButtonComponent = (props: Props) => {
    return (
        <button className='p-12 py-2 rounded-full text-base font-normal bg-blue text-white uppercase'>
            {props.text}
        </button>
    )
}

export default ButtonComponent
