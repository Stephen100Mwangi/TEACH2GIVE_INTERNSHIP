import ProgressComponent from "./ProgressComponent"

const ShoeWrapper = () => {
    return (
        <div className="bg-card h-[450px] w-96 rounded-md justify-center items-center relative flex flex-col gap-y-5">
            <div className="h-[640px] w-[840px] flex justify-center items-center">
                <img src="./shoe-removebg-preview.png" className="scale-150 mr-40"></img>
            </div>
            <div className="flex gap-x-3 absolute bottom-10">
                <div className="flex"><ProgressComponent color="black"></ProgressComponent></div>
                <div className="flex"><ProgressComponent></ProgressComponent></div>
                <div className="flex"><ProgressComponent></ProgressComponent></div>
                <div className="flex"><ProgressComponent></ProgressComponent></div>
                <div className="flex"><ProgressComponent></ProgressComponent></div>
            </div>
          
        </div>
    )
}

export default ShoeWrapper
