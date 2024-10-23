import ProductCard from "./components/ProductCardComponent"
import ShoeWrapper from "./components/ShoeWrapper"

const App = () => {
  return (
    <div className="h-screen flex bg-gray justify-center items-center gap-1">
      <ShoeWrapper></ShoeWrapper>
      <ProductCard></ProductCard>
    </div>
  )
}

export default App
