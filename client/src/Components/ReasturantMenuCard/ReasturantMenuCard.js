import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MinusIcon, PlusIcon } from 'react-native-heroicons/solid';
import { ThemeColor } from '../../Theme';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsById } from '../../Redux/CartSlice/basketSlice';
import { urlFor } from '../../../Sanity';

const ReasturantMenuCard = ({ item }) => {
    const dispatch = useDispatch()
    const itemsArray = useSelector(state => selectBasketItemsById(state, item._id));
    const { Color } = useSelector(state => state.settings)

    const handleMinus = (x) => {
        dispatch(removeFromBasket(x._id))
    }
    const handlePlus = (x) => {
        dispatch(addToBasket(x))
    }
    return (
        <View
            className='flex-row  mb-3 items-center rounded-xl space-x-2 bg-white shadow-md'
            style={{ padding: wp(2), marginHorizontal: wp(3) }}
        >
            <View className='rounded-xl overflow-hidden'>
                <Image source={{uri:urlFor(item.image).url()}} style={{ width: wp(25), height: wp(25) }} />
            </View>
            <View className='flex-1'>
                <View>
                    <Text
                        className='text-neutral-700 font-bold'
                        style={{ fontSize: wp('5') }}
                    >{item.name}</Text>
                    <Text
                        className='text-neutral-700 '
                        style={{ fontSize: wp('4') }}
                    >{item.description}</Text>
                    <View className='flex-row justify-between items-center' style={{ marginTop: wp('6') }}>
                        <Text
                            className='text-neutral-700 font-bold'
                            style={{ fontSize: wp('5') }}
                        > ${item.price}</Text>
                        <View className='flex-row space-x-2 items-center'>
                            <TouchableOpacity
                                onPress={() => handleMinus(item)}
                                className=' rounded-full items-center justify-center shadow'
                                style={{ width: wp('7'), height: wp('7'), backgroundColor: ThemeColor(Color).bgColor(1),shadowColor:ThemeColor(Color).bgColor(0.78) }}
                            >
                                <MinusIcon size={wp(5)} color={'white'} />
                            </TouchableOpacity>
                            <Text className='font-bold shadow-md' style={{ fontSize: wp('4') }}>
                                {itemsArray.length}
                            </Text>
                            <TouchableOpacity
                                onPress={() => handlePlus(item)}
                                className=' rounded-full items-center justify-center shadow'
                                style={{ width: wp('7'), height: wp('7'), backgroundColor: ThemeColor(Color).bgColor(1) ,shadowColor:ThemeColor(Color).bgColor(0.78) }}
                            >
                                <PlusIcon size={wp(5)} color={'white'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ReasturantMenuCard