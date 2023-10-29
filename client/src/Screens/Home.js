import { View, Text, ScrollView, SafeAreaView, TextInput, StatusBar, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { CheckIcon, MagnifyingGlassIcon, MapPinIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { AdjustmentsVerticalIcon } from 'react-native-heroicons/solid'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { categories, featured } from '../constants';
import RestaurantCategories from '../Components/HomeComponents/RestaurantCategories';
import { useNavigation } from '@react-navigation/native';
import Category from '../Components/HomeComponents/Category';
import { ThemeColor, pallete, themeColors } from '../Theme';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../Redux/SettingsSlice/SettingsSlice';
import { getFeaturedResturants } from '../Api/api';


const Home = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { Color } = useSelector(state => state.settings)
  const [SettingsLayout, SetSettingsLayout] = useState(false)
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [])

  const handleSettings = () => {
    SetSettingsLayout(!SettingsLayout)
  }

  const handleColor = (index) => {
    dispatch(setColor(index))
  }

  const { activeCategory } = useSelector(state => state.resturant)

  const [featuredRestaurant, SetfeaturedRestaurant] = useState([])
  useEffect(() => {
    getFeaturedResturants().then((data) => {
      let filteredData = [];

      if (activeCategory === 'Sweet') {
        filteredData = data.filter((item) => item.name == 'Sweet');
      } else if (activeCategory === 'Noodles') {
        filteredData = data.filter((item) => item.name == 'Popular Chinese');
      } else if (activeCategory === 'Burger') {
        filteredData = data.filter((item) => item.name == 'Hebron Resturant');
      } else if (activeCategory === 'Pizza') {
        filteredData = data.filter((item) => item.name == 'Popular Italian' || item.name == 'Pizza Reastaurnt');
      }
      else {
        filteredData = data
      }

      SetfeaturedRestaurant(filteredData);
    });
  }, [activeCategory]);

  return (
    <View className="bg-white flex-1 relative" >

      <View className='bg-white absolute items-center justify-center bottom-0 rounded-t-[40px] z-[999] shadow-xl'
        style={{ display: SettingsLayout ? 'flex' : 'none', width: wp(100), height: hp(47), paddingHorizontal: hp(2), paddingVertical: hp(3.5), gap: hp(2.4) }}>
        <View style={{ gap: hp(0.5) }}>
          <Image source={require('../assets/images/paint.png')} style={{ width: hp(7), height: hp(7) }} />
          <View >
            <Text className='text-neutral-800 font-semibold' style={{ fontSize: wp(11) }}>Select Theme</Text>
            <Text className='text-neutral-600 font-semibold' style={{ fontSize: wp(4.5) }}>Press one of the colors to change the color theme</Text>
          </View>
        </View>


        <View className='flex-row justify-center' style={{ marginTop: hp(2), gap: hp(1.8) }}>
          {
            pallete.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => handleColor(index)}
                  className='rounded-full items-center justify-center'
                  style={{ width: wp(12), height: wp(12), backgroundColor: item.bgColor(1) }}>
                  {
                    Color === index ? <CheckIcon size={30} strokeWidth={3} style={{ color: ThemeColor(Color).text }} /> : <></>
                  }
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
        <View className='items-center w-full'>
          <TouchableOpacity onPress={() => handleSettings()} className='rounded-full w-[80%]  items-center justify-center' style={{ padding: wp(4), backgroundColor: ThemeColor(Color).bgColor(1) }}>
            <Text style={{ fontSize: wp(5.5) }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className='flex-row justify-between mt-10  h-[70px] items-center space-x-2' style={{ marginHorizontal: wp('4%') }} >
        <View className='rounded-full border-neutral-300 border-2 flex-1 py-3 flex-row justify-between items-center px-3 overflow-hidden'>
          <View className='flex-row w-[50%]  space-x-1 items-center overflow-hidden'>
            <MagnifyingGlassIcon size={26} strokeWidth={2} color={'gray'} />
            <TextInput
              placeholder="Restaurant"
              style={{ fontSize: 14, color: 'gray' }}
            />
          </View>
          <View className='flex-row border-l-2 w-[50%] border-gray-400  items-center justify-end overflow-hidden'>
            <MapPinIcon size={22} strokeWidth={2} color={'gray'}  />
            <Text className='text-gray-500 text-sm'> Palestine-Hebron</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleSettings()}
          className='justify-center items-center rounded-full w-[50px] h-[50px] shadow '
          style={{ backgroundColor: ThemeColor(Color).bgColor(1) }}>
          <AdjustmentsVerticalIcon size={36} color={'white'} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >

        <View className='mb-4'>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 15 }}
          >

            {/* Category */}

            <Category />
          </ScrollView>

          {/* Category Featured */}
          {
            featuredRestaurant.map((item) => (
              <RestaurantCategories
                key={item._id}
                featured={item}
                navigation={navigation}
              />
            ))
          }

        </View>
      </ScrollView>
    </View>
  )
}

export default Home