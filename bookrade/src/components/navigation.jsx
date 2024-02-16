import "./../css/navigation.css";
import Header from "./header";
import Navbar from "./navbar";
import BottomNav from "./BottomNav";

const navigation = () => {
  return (
    <div>
    {/* <div style={{ minHeight: "100vh" }}> */}
      <Header />
      <Navbar />
      <BottomNav />
    {/* <div style={{ height: "400vh" }}></div> */}
    </div>
  )
}

export default navigation