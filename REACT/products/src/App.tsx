import ProductCard from "./components/ProductCardComponent"
import ShoeWrapper from "./components/ShoeWrapper"

const App = () => {
  return (
    <div className="h-screen w-full overflow-clip flex bg-gray justify-center items-center gap-x-1 max-sm:flex max-sm:p-4 max-sm:flex-col max-sm:gap-y-0">
      <ShoeWrapper></ShoeWrapper>
      <ProductCard></ProductCard>
    </div>
  )
}

export default App
