import { View, Text, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import OrderCard from '../Components/Cart/OrderCard'
import { ThemeColor, themeColors } from '../Theme'
import { selectResturant } from '../Redux/ResturantSlice/ResturantSlice';
import {  useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../Redux/CartSlice/basketSlice';

const Cart = () => {
  const navigation = useNavigation()
  const item = useSelector(selectResturant)
  const { Color } = useSelector(state => state.settings)

  const CartItems = useSelector(selectBasketItems)
  const TotalPrice = useSelector(selectBasketTotal)
  const DeliveryFees = 2

  const [groupedItems, setGroupedItems] = useState([])
  useMemo(() => {
    const gItems = CartItems.reduce((group, item)=>{
        if(group[item._id]){
          group[item._id].push(item);
        }else{
          group[item._id] = [item];
        }
        return group;
      },{})
    setGroupedItems(gItems);
    // console.log('items: ',gItems);
   
}, [CartItems])
  return (
    <View className='flex-1'>
      <View className='relative flex-1'>
        <ScrollView showsHorizontalScrollIndicator={false} >
          <View className='flex-row relative  items-center py-2 justify-center ' style={{ marginTop: hp(2.5) }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className='absolute  left-3  rounded-full items-center justify-center'
              style={{ width: hp(4.5), height: hp(4.5) ,backgroundColor:ThemeColor(Color).bgColor(1)}}
            >
              <ArrowLeftIcon size={25} strokeWidth={3} color='white' />
            </TouchableOpacity>
            <View className='space-y-1'>
              <Text className='text-center font-extrabold' style={{ fontSize: wp(6) }}>Your Cart</Text>
              <Text className='text-center text-neutral-600'>{item.name}</Text>
            </View>
          </View>
          <View className=' w-full flex-row  py-2 justify-evenly items-center' style={{backgroundColor:ThemeColor(Color).bgColor(0.3)}}>
            <Image source={require('../assets/images/bikeGuy.png')} style={{ height: hp(8), width: hp(8) }} />
            <Text className='font-semibold text-neutral-800'>Delevier in 20-30 minutes</Text>
            <Pressable className='justify-center'>
              <Text className='font-semibold' style={{color:ThemeColor(Color).text}}>Change</Text>
            </Pressable>
          </View>
          <View style={{ marginTop: hp(4),marginBottom:hp(4), paddingHorizontal: wp(3) }}>
            {
              Object.entries(groupedItems).map(([key,items]) => (
                <OrderCard item={items} key={item._id} />
              ))
            }
          </View>

        </ScrollView>
        <View
          className='relative bottom-0 rounded-t-3xl w-full '
          style={{ backgroundColor: ThemeColor(Color).bgColor(0.3), padding: wp(6) }}
        >
          <View className='flex-row justify-between items-center'>
            <Text>Subtotal</Text>
            <Text>{TotalPrice}</Text>
          </View>
          <View className='flex-row justify-between items-center'>
            <Text>Delevery Fee</Text>
            <Text>${DeliveryFees}</Text>
          </View>
          <View className='flex-row justify-between items-center'>
            <Text className='font-bold'>Order Total</Text>
            <Text className='font-bold'>${TotalPrice+DeliveryFees}</Text>
          </View>
          <TouchableOpacity
          disabled={!CartItems.length}
            onPress={() => navigation.navigate('PreparingOrderScreen')}
            className='items-center justify-center rounded-full shadow z-10'
            style={{ marginTop: hp(2), backgroundColor: ThemeColor(Color).bgColor(1), padding: wp(4) }}>
            <Text className='text-white' style={{ fontSize: (wp(5)) }}>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Cart