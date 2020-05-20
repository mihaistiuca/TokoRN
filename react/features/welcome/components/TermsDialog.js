import React, { Component } from 'react';
import { ScrollView ,View, Text, Dimensions} from 'react-native';
const { width: globalScreenWidth, height: globalScreenHeight  } = Dimensions.get("screen");
import ShortTermsAndConditions from './ShortTermsAndConditions';
import Dialog, { DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';

class TermsDialog extends Component {
    static navigationOptions = {
    }
  
    constructor(props) {
        super(props);
        this.state = {
          isReady: false,
        }
    };

    render() {
        return (
            <Dialog
              visible={this.props.isVisible}
              onTouchOutside={() => {
                  // do nothing
              }}
              footer={
                  <DialogFooter>
                      <DialogButton
                          text="I AGREE"
                          onPress={this.props.pressAcceptTerms}
                          textStyle={{ color: 'green' }}
                      />
                  </DialogFooter>
              }
          >
            <DialogContent>
              {/* <Text>Termeni și Condiții</Text> */}
              <View style={{ width: globalScreenWidth - 100 }}>
                <ShortTermsAndConditions></ShortTermsAndConditions>
              </View>
            </DialogContent>
        </Dialog>
        )
    }
}

export default TermsDialog


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
        height: globalScreenHeight - 260
    },
}