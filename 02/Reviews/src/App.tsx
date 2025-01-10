import { useSelector } from "react-redux";

function App() {
  const store = useSelector(state => state);
  console.log({
    store
  })
  return (
    <h1>Hello world!</h1>
  )
}

export default App
