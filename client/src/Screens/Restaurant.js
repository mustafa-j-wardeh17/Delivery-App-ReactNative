import { View, Text, ScrollView, Image, TouchableOpacity, Pressable, TouchableOpacityBase } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MapPinIcon, ArrowLeftIcon } from 'react-native-heroicons/outline';
import { MinusIcon, StarIcon } from 'react-native-heroicons/solid';
import ReasturantMenuCard from '../Components/ReasturantMenuCard/ReasturantMenuCard';
import { ThemeColor } from '../Theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectResturant } from '../Redux/ResturantSlice/ResturantSlice';
import { emptyBasket, selectBasketItems, selectBasketTotal } from '../Redux/CartSlice/basketSlice';
import { urlFor } from '../../Sanity';
const Restaurant = () => {
  const navigation = useNavigation()
  const item = useSelector(selectResturant)
  const { Color } = useSelector(state => state.settings)
  const route = useRoute()
  const itemsArray = useSelector(selectBasketItems)
  const TotalPrice = useSelector(selectBasketTotal)
  const dispatch = useDispatch()

  const handelBackBtn = () => {
    navigation.navigate('Home')
    dispatch(emptyBasket())
  }
  return (
    <View className='flex-1 relative'>
      <View className='h-[40%] w-full relative'>
        <Image
          source={{ uri: urlFor(item.image).url() }}
          className='w-full h-full p-1'
        />
        <View className='absolute'>
          <TouchableOpacity
            onPress={() => handelBackBtn()}
            className=' bg-white rounded-full items-center justify-center shadow-neutral-700 shadow'
            style={{ width: hp(4.5), height: hp(4.5), left: wp(3), top: hp(5.5) }}
          >
            <ArrowLeftIcon size={25} strokeWidth={3} color={ThemeColor(Color).text} />
          </TouchableOpacity>
        </View>
      </View>
      <View className='absolute  z-10 h-[70%] rounded-t-[40] overflow-hidden w-full bg-white bottom-0'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: hp('3'), paddingHorizontal: hp(2) }}>
            <Text className='font-bold' style={{ fontSize: wp('9') }}>{item.name}</Text>
            <View className='flex items mt-2 space-y-1'>
              <View className='flex-row space-x-1'>
                <StarIcon size={14} color={'#ffd700'} />
                <Text className='text-neutral-600'>({item.reviews} reviews) , </Text>
                <Text className='font-bold text-neutral-600'>{item.type?.name} </Text>
              </View>
              <View className='flex-row space-x-1'>
                <MapPinIcon size={14} color={'gray'} />
                <Text className='text-neutral-600'> Nearbt-{item.address}</Text>
              </View>
            </View>
            <Text className='text-neutral-500 mt-3 text-[18px]'>{item.description}</Text>
          </View>

          <View style={{ marginTop: wp('5'), marginBottom: hp(9) }}>
            <Text
              className='font-bold'
              style={{ fontSize: wp('9'), paddingHorizontal: hp(2), marginBottom: wp('5') }}
            >
              Menu
            </Text>

            {
              item.dishes.map((item) => (
                <ReasturantMenuCard
                  key={item._id}
                  item={item}
                />
              ))
            }
          </View>
        </ScrollView>
        <View
          className='absolute bottom-4 w-full items-center overflow-hidden'
          style={{ width: wp('100%'), height: hp('7.8%') }}
        >
          <TouchableOpacity
            disabled={!itemsArray.length}
            onPress={() => navigation.navigate('Cart')}
            className='flex-row items-center z-100 rounded-full h-full  justify-between'
            style={{ width: wp('90%'), padding: hp('1%'), backgroundColor: ThemeColor(Color).bgColor(1) }}
          >
            <View
              className='fontSize rounded-full items-center justify-center z-10  shadow'
              style={{ width: hp('6%'), height: hp('6%'), backgroundColor: ThemeColor(Color).bgColor(1) }}
            >
              <Text className='text-white font-semibold' style={{ fontSize: wp('5.6'), }} >{itemsArray.length}</Text>
            </View>
            <Text className='text-white font-semibold' style={{ fontSize: wp('5.6'), }} >View Cart</Text>
            <Text className='text-white font-semibold' style={{ fontSize: wp('5.6'), marginRight: wp(3) }} >${TotalPrice}</Text>

          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Restaurant