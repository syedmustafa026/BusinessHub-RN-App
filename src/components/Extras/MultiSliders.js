import React from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider"
import { Platform } from "react-native";
import * as colors from "../../utilities/colors"

const Slider = (props) => {
    return (
        <MultiSlider
            onValuesChangeFinish={(value) => { props.setpriceFrom(JSON.stringify(value[0])), props.setpriceTo(JSON.stringify(value[1])) }}
            markerStyle={{
                ...Platform.select({
                    ios: {
                        height: 20,
                        width: 20,
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 0,
                            height: 3
                        },
                        shadowRadius: 1,
                        shadowOpacity: 0.1
                    },
                    android: {
                        height: 20,
                        width: 20,
                        borderRadius: 50,
                        backgroundColor: colors.black
                    }
                })
            }}
            selectedStyle={{
                backgroundColor: colors.black,
            }}
            trackStyle={{
                backgroundColor: colors.gray300,
                height: 4

            }}
            touchDimensions={{
                height: 40,
                width: 40,
                borderRadius: 20,
                slipDisplacement: 40
            }}
            values={[0, 10000]}
            sliderLength={350}
            valuePrefix="0"
            min={0}
            max={10000}
            allowOverlap={false}
            minMarkerOverlapDistance={10} />
    )
}
export default Slider