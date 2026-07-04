import {persist} from "zustand/middleware"
import {create} from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

const offersStore = create(
    persist(
        (set) => ({
            offers:[],
            isLoading:false,
            error:null,
            fetchOffers : async() => {
                set({isLoading:true,error:null})
                try{
                    const res = await axios.get(`${BASE_URL}/offers`);
                    set({offers:res.data,isLoading:false})
                }
                catch(err){
                    set({isLoading:false, error:err?.message || "Failed to Load Offers"})
                    console.log(err);
                }
            },
            addOffer:(offer) => set((state) => ({offers:[...state.offers,offer]})),
            removeOffer:(offer) => set((state) => ({
                offers: state.offers.filter((off) => off.id!==offer.id || off.title!==offer.title),
            }))
        })
        ,
        {name:"Special Offers Store"}
    )
)

export default offersStore;

