import React, {useState, useEffect} from "react";

import ListProducts from "./ListProducts";
import AddProduct from "./AddProduct";

const SellerRoutes = (props) => {
    const [currentMain, setCurrentMain] = useState("ListProducts");
    const [previous, setPrevious] = useState("ListProducts");
  
    // useEffect(() => {
    //   onComponentChange(currentMain);
    // }, [currentMain]);
  
    const MainComponents = () => {
      switch (currentMain) {
        case "ListProducts":
            return (
                <ListProducts
                navigate={navigate}
                previous={previous}
                //   toggleLogoHeader={toggleLogoHeader}
                />
            );
        case "AddProduct":
            return (
                <AddProduct
                navigate={navigate}
                previous={previous}
                //   toggleLogoHeader={toggleLogoHeader}
                />
            );
        default:
            return (
                <ListProducts
                navigate={navigate}
                previous={previous}
                //   toggleLogoHeader={toggleLogoHeader}
                />
            );
      }
    };
  
    const navigate = (origin, destination) => {
      setPrevious(origin);
      setCurrentMain(destination);
    };
  
    return <MainComponents />;
};

export default SellerRoutes;