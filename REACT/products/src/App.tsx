import ProductCard from "./components/ProductCardComponent"
import ShoeWrapper from "./components/ShoeWrapper"
import { IoMdMenu } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi2";
import { IoIosAddCircle } from "react-icons/io";

const App = () => {
  return (
    <div className="h-screen w-full relative overflow-clip flex bg-gray justify-start items-start gap-x-1 max-sm:flex max-sm:p-4 max-sm:flex-col max-sm:gap-y-0">

      <div className="flex my-3 mb-8 w-full justify-between items-center">
        <IoMdMenu className="text-2xl"></IoMdMenu>
        <div className="flex gap-x-4">
          <IoIosSearch className="text-2xl"></IoIosSearch>
          <IoPersonSharp className="text-2xl"></IoPersonSharp>
          <div className="relative">
            <HiShoppingBag className="text-2xl"></HiShoppingBag>
            <IoIosAddCircle className="text-xs absolute -left-1 top-3 text-blue z-50"></IoIosAddCircle>
          </div>
        </div>
      </div>

      <ShoeWrapper></ShoeWrapper>
      <ProductCard></ProductCard>
    </div>
  )
}

export default App
