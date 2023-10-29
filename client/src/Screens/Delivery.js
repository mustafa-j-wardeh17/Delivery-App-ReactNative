import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { featured } from '../constants'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { ThemeColor, themeColors } from '../Theme';
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { selectResturant } from '../Redux/ResturantSlice/ResturantSlice';
import { emptyBasket } from '../Redux/CartSlice/basketSlice';

const Delivery = () => {
  const navigation = useNavigation()
  const item = useSelector(selectResturant)
  const dispatch = useDispatch()
  const { Color } = useSelector(state => state.settings)
  const handleCancel = () => {
    navigation.navigate('Home')
    dispatch(emptyBasket())
  }
  return (
    <View className='flex-1'>
      {/* map view */}
      <MapView
        initialRegion={{
          latitude: item.lat,
          longitude: item.lng,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,

        }}
        className='flex-1'
        mapType='standard'
      >
        <Marker
          coordinate={{
            latitude: item.lat,
            longitude: item.lng,
          }}
          title={item.name}
          description={item.description}
          pinColor={ThemeColor(Color).bgColor(1)}
        />
      </MapView>
      <View className="rounded-t-3xl -mt-12  relative" style={{ backgroundColor: ThemeColor(Color).bgColor(1) }}>
        <TouchableOpacity className="absolute right-4 top-2">

        </TouchableOpacity>
        <View className="flex-row justify-between px-5 pt-10">
          <View>
            <Text className="text-lg text-gray-700 font-semibold">Estimated Arrival</Text>
            <Text className="text-3xl font-extrabold text-gray-700">20-30 Minutes</Text>
            <Text className="mt-2 text-gray-700 font-semibold">Your Order is own its way</Text>
          </View>
          <Image className="h-24 w-24" source={require('../assets/images/bikeGuy2.gif')} />
        </View>

        <View
          style={{ backgroundColor: ThemeColor(Color).bgColor(1) }}
          className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2 shadow-2xl">
          <View style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} className="p-1 rounded-full">
            <Image style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} className="w-16 h-16 rounded-full shadow-neutral-600 shadow" source={require('../assets/images/bikeGuy2.gif')} />
          </View>

          <View className="flex-1 ml-3">
            <Text className="text-lg font-bold text-white">Mustafa Wardeh</Text>
            <Text className="text-white font-semibold">Your Rider</Text>
          </View>
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity className="bg-white p-2 rounded-full  shadow-neutral-600 shadow-md">
              <Icon.Phone fill={ThemeColor(Color).bgColor(1)} stroke={ThemeColor(Color).bgColor(1)} strokeWidth="1" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleCancel()} className="bg-white p-2 rounded-full shadow-neutral-600 shadow-md">
              <Icon.X stroke={'red'} strokeWidth="5" />
            </TouchableOpacity>

          </View>

        </View>
      </View>
    </View>
  )
}

export default Delivery