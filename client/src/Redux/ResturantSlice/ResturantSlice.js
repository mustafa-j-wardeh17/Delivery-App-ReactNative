import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeCategory:'All',
  resturant: {
    id: null,
    name: null,
    image: null,
    stars: null,
    reviews: null,
    address: null, 
    description: null,
    dishes: {},
    lng: null,
    lat: null,
    category:null
  }
}

export const resturantSlice = createSlice({
  name: 'resturant',
  initialState,
  reducers: {
    setactiveCategory:(state, action) => {
      state.activeCategory = action.payload;
    },
    setResturant: (state, action) => {
      state.resturant = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setResturant,setactiveCategory } = resturantSlice.actions

export const selectResturant = state=> state.resturant.resturant;

export default resturantSlice.reducer