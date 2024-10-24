import ButtonComponent from "./ButtonComponent"
import ColorComponent from "./ColorComponent"
import PriceBadgeComponent from "./PriceBadgeComponent"
import SizeCardComponent from "./SizeCardComponent"


const ProductCard = () => {
    return (
        <div className="bg-card shadow-2xl -ml-5 z-50 rounded-md flex h-[500px] flex-col gap-y-5 w-fit p-5 max-sm:p-4 max-sm:w-[300px] max-sm:mx-auto max-sm:gap-y-3 max-sm:h-[350px]">
                <h1 className="text-2xl font-bold max-sm:text-xl">Product Name</h1>
                <p className="text-base font-light max-sm:text-sm">More Info</p>
                <p className="text-base font-light max-sm:text-sm">Product | Description</p>
                <div className="w-64 h-[2px] bg-black bg-opacity-45 max-sm:h-[1px] max-sm:w-full"></div>
                <div className="w-64 h-[2px] bg-opacity-45 bg-black max-sm:h-[1px] max-sm:w-full"></div>
                <div className="w-64 h-[2px] bg-opacity-45 bg-black max-sm:h-[1px] max-sm:w-full"></div>
                <div className="text-base font-light uppercase max-sm:text-sm">COLOR</div>
                <div className="flex gap-x-4">
                    <ColorComponent color="black"></ColorComponent>
                    <ColorComponent color="blue"></ColorComponent>
                    <ColorComponent color="orange"></ColorComponent>
                    <ColorComponent color="pink"></ColorComponent>
                    <ColorComponent color="yellow"></ColorComponent>
                </div>
                <div className="max-sm:text-sm">SIZE</div>
                <div className="flex justify-between">
                    <SizeCardComponent size={40}></SizeCardComponent>
                    <SizeCardComponent size={41}></SizeCardComponent>
                    <SizeCardComponent size={42}></SizeCardComponent>
                    <SizeCardComponent size={43}></SizeCardComponent>
                    <SizeCardComponent size={44}></SizeCardComponent>
                    <SizeCardComponent size={45}></SizeCardComponent>
                </div>
                <div className="flex gap-x-10">
                    <ButtonComponent text="BUY"></ButtonComponent>
                    <PriceBadgeComponent currency="$" amount={6790}></PriceBadgeComponent>
                </div>

            
        </div>
    )
}

export default ProductCard
