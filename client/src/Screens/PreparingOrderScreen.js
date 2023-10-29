import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { CachedImage } from '../Helper/helper'
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery')
    }, 3000);
  }, [])
  return (
    <View className='flex-1 justify-center items-center'>
      <Image source={require('../assets/images/delivery.gif')} className="h-80 w-80" />
    </View>
  )
}

export default PreparingOrderScreen