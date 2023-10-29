import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CachedImage } from '../../Helper/helper'
import { TouchableOpacity } from 'react-native'
import { categories } from '../../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ThemeColor } from '../../Theme'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../Api/api'
import { urlFor } from '../../../Sanity'
import { setactiveCategory } from '../../Redux/ResturantSlice/ResturantSlice'


const Category = () => {
  const dispatch = useDispatch()
  const { activeCategory } = useSelector(state => state.resturant)
  const { Color } = useSelector(state => state.settings)

  const handleActiveCategory = (name) => {
    console.log('name ' + name)
    dispatch(setactiveCategory(name))
  }
  const [categories, Setcategories] = useState([])
  useEffect(() => {
    getCategories().then((data) => {
      const sortedCategories = [...data].sort((a, b) => a.name.localeCompare(b.name));
      Setcategories(sortedCategories);
    });
  }, [])
  return (
    <View className='flex-row shadow-sm' style={{ marginLeft: wp('4%') }}>

      {
        categories.map((item) => (
          <View key={item._id} style={{ alignItems: 'center', marginRight: 20, marginTop: 1 }}>
            <TouchableOpacity
              onPress={() => handleActiveCategory(item.name)}
              className=' items-center justify-center shadow-sm'
              style={{ height: 80, width: 80, borderRadius: 40, backgroundColor: activeCategory == item.name ? ThemeColor(Color).bgColor(1) : 'rgba(0,0,0,0.1)' }}
            >
              <Image
                source={{ uri: urlFor(item.image).url() }}
                className='h-[70%] w-[70%]'
              />
            </TouchableOpacity>
            <Text className='text-neutral-500'>{item.name}</Text>
          </View>
        ))
      }

    </View>
  )
}

export default Category
