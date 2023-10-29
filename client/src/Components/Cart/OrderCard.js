import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MinusIcon } from 'react-native-heroicons/solid';
import { themeColors,ThemeColor } from '../../Theme';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket } from '../../Redux/CartSlice/basketSlice';
import { urlFor } from '../../../Sanity';

const OrderCard = ({item,key}) => {
    const [orderNumber, SetorderNumber] = useState(2)
    const dispatch = useDispatch()
    const { Color } = useSelector(state => state.settings)

    
   

    const handleOrderNumber = (item) => {
        SetorderNumber(orderNumber - 1)
        dispatch(removeFromBasket(item._id))
    }
    return (
        <View key={key} className='rounded-3xl flex-row justify-between items-center bg-white shadow-2xl'
            style={{ padding: wp(3), marginBottom: hp(3) }}
        >
            <View className='flex-row items-center ' style={{ gap: wp(2) }}>
                <Text style={{ fontSize: wp(5), color: ThemeColor(Color).text}}  className='font-semibold'>{item.length} x</Text>
                <View className='rounded-full overflow-hidden' >
                    <Image source={{uri:urlFor(item[0]?.image).url()}} style={{ width: wp(13), height: wp(13) }} />
                </View>
                <Text style={{ fontSize: wp(3.8) }}>{item[0]?.name}</Text>
            </View>
            <View className='flex-row items-center ' style={{ gap: wp(2) }}>
                <Text style={{ fontSize: wp(4.2) }} className='font-semibold'>${item[0]?.price}</Text>
                <TouchableOpacity
                    onPress={()=>handleOrderNumber(item[0])}
                    className='rounded-full items-center justify-center shadow'
                    style={{ backgroundColor: ThemeColor(Color).bgColor(1), width: wp(8), height: wp(8) }}
                >
                    <MinusIcon size={wp(6.5)} strokeWidth={3} color={"white"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OrderCard