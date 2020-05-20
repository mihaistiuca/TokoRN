import React, { Component } from 'react';
import { ScrollView ,View, Text, Dimensions} from 'react-native';
const { width: globalScreenWidth, height: globalScreenHeight  } = Dimensions.get("screen");

class ShortTermsAndConditions extends Component {
    static navigationOptions = {
        gesturesEnabled: true,
        animationEnabled: false,
        header: null,
        gestureResponseDistance: {horizontal: 300}
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={ styles.containerInMain }>
                  
                <View style={{height: 20}}></View>
                {/* <Text style={styles.categoryText}>Politica de confidențialitate</Text> */}
                <Text style={[styles.titleText]}>Reminder</Text>
                
                <View style={{height: 20}}></View>

                <Text style={[styles.paragraphText, { fontWeight: 'bold' }]}>Please have in mind the following Terms:</Text>
                
                <View style={{height: 20}}></View>

                <Text style={styles.paragraphText}>You are prohibited from posting and agree not to post or show any objectionable content which includes, 
                but is not limited to: Sexually Explicit Material, Violence and Bullying, Hate Speech, Sensitive Event, 
                Illegal Activity, and Intellectual Property Infrigement.</Text>

                <View style={{height: 20}}></View>

                <Text style={styles.paragraphText}>If you spot any violation, please inform us using the Report button inside the call. Also, you have the possibility to block 
                an attendant to a conference using the 'Kick Out' option.</Text>

                <View style={{height: 20}}></View>
                <Text style={styles.paragraphText}>For more detailed information, please contact us to tokochat.com@gmail.com</Text>
            </ScrollView>
        )
    }
}

export default ShortTermsAndConditions


styles={
    titleText: {
        fontSize: 20,
        // color: Colors.blueWeveed,
        fontWeight: 'bold',
        paddingBottom: 7,
        paddingTop: 7,
        textAlign: 'center'
    },
    paragraphText: {
        fontSize: 14,
        textAlign: 'center'
        // textAlign: 'justify'
        // color: Colors.blueWeveed,
    },
    containerInMain: {
        // backgroundColor: Colors.white,
        height: globalScreenHeight - 300
    },
}