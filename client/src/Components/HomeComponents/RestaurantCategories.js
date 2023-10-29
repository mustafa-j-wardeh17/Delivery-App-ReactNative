import { View, Text, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { themeColors, ThemeColor } from '../../Theme';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { selectResturant, setResturant } from '../../Redux/ResturantSlice/ResturantSlice';
import { urlFor } from '../../../Sanity';

const RestaurantCategories = ({ featured, navigation, key }) => {
    const { Color } = useSelector(state => state.settings)
    return (
        <View key={key} className='mt-8'>
            <View className='mb-6 space-y-1' style={{ marginLeft: wp('4%') }}>
                <View className='flex-row justify-between items-center'>
                    <Text className='font-bold' style={{ fontSize: wp(5.5) }}>{featured.name}</Text>
                    <Pressable className='mr-4 '>
                        <Text className=' font-[900]' style={{ color: ThemeColor(Color).text }}>See All</Text>
                    </Pressable>
                </View>
                <Text className='text-neutral-500' style={{ fontSize: wp(4) }}>{featured.description}</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View className=' flex-row py-4 ' style={{ marginLeft: wp('4%') }}>
                    {
                        featured.restaurants.map((restaurant) => (
                            <RestaurantCategoriesCard
                                navigation={navigation}
                                restaurant={restaurant}
                                key={restaurant._id}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const RestaurantCategoriesCard = ({ restaurant, navigation }) => {
    const { Color } = useSelector(state => state.settings)
    const dispatch = useDispatch()
    const RestaurantTest = useSelector(selectResturant)
    const handelSelectedRestaurant = (x, navigation) => {
        dispatch(setResturant(x))
        navigation.navigate('Restaurant', { item: x })
    }

    return (
        <TouchableOpacity  onPress={() => handelSelectedRestaurant(restaurant, navigation)} style={{ shadowColor: ThemeColor(Color).bgColor(0.4) }} className='bg-white shadow mr-4 rounded-3xl' >
            <View style={{ width: wp(70), height: wp(80) }}>
                <View className='h-[60%] w-full rounded-t-3xl overflow-hidden'>
                    <Image source={{ uri: urlFor(restaurant.image).url() }} className='w-full h-full' />
                </View>
                <View className=' w-full h-[40%] ml-4 justify-center'>
                    <Text className='font-bold text-[20px] mb-2' >
                        {restaurant.name}
                    </Text>
                    <View>
                        <View className='flex-row items-center mb-1'>
                            <StarIcon size={20} strokeWidth={2} color={'#ffd700'} />
                            <Text className='ml-1 text-neutral-400'>{restaurant.stars}</Text>
                            <View className='flex-row items-center ml-2'>
                                <Text className='text-neutral-400'>({restaurant.reviews} reviews) - </Text>
                                <Text className='font-bold text-neutral-500'>{restaurant.type.name}</Text>
                            </View>
                        </View>
                        <View className='flex-row space-x-2 items-center'>
                            <MapPinIcon size={20} strokeWidth={2} color={'gray'} />
                            <Text className='text-neutral-400'>
                                {
                                    restaurant.address.length > 35 ?
                                        restaurant.address.slice(0, 35)
                                        : restaurant.address
                                }
                            </Text>
                        </View>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default RestaurantCategories