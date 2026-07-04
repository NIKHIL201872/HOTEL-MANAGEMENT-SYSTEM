import { useEffect } from "react";
import offersStore from "../store/offersStore";



const useSpecialOffers = () => {
    const {offers,isLoading,error,fetchOffers} = offersStore();
    useEffect(() => {
        fetchOffers();
    }
    ,[fetchOffers])
  return ({offers,isLoading,error})
}

export default useSpecialOffers;