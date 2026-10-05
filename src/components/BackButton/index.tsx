import Icon from '@expo/vector-icons/AntDesign';

import React from 'react'

function BackButtonHeader({ navigation }: any) {
    return (
        <Icon
            name="arrow-left"
            size={28}
            color="#1A1C1E"
            onPress={() => navigation.goBack()}
        />
    )
}

export default BackButtonHeader