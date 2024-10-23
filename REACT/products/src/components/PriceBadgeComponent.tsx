interface Props {
    amount:number,
    currency:string
}

const PriceBadgeComponent = (props: Props) => {
    return (
        <div className="flex justify-center text-white shadow-2xl bg-black bg-opacity-45 rounded-full items-center gap-x-5 p-12 py-2">
            <div className="font-light">{props.currency}</div>
            <div className="font-medium">{props.amount}</div>
        </div>
    )
}

export default PriceBadgeComponent
