
import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, DeviceEventEmitter,
    SafeAreaView, Image, NativeModules, NativeEventEmitter, ActivityIndicator
} from 'react-native';
import RNMomosdk from 'react-native-momosdk';
import { withNavigation } from 'react-navigation'
const RNMoMoPaymentModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMoMoPaymentModule);

const merchantNameLabel = "Nhà cung cấp";
const billdescription = "Fast and Furious 8";
const amount = 50000;
const enviroment = "0"; //"1": production

class MomoPayment extends Component {
    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this)
    }
    state = {
        merchantname: "Lê Độ Cinema",
        merchantcode: this.props.navigation.state.params.TicketID,
        textAmount: this.formatNumberToMoney(amount, null, ""),
        amount: amount,
        description: "",
        processing: false
    }
    componentDidMount() {
        // Listen for native events
        let me = this;
        EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenReceived', (response) => {
            console.log("<MoMoPay>Listen.Event::" + JSON.stringify(response));
            try {
                if (response && response.status == 0) {
                    let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
                    me.setState({ description: JSON.stringify(response), processing: false });
                    let momoToken = response.data;
                    let phonenumber = response.phonenumber;
                    let message = response.message;
                    let orderId = response.refOrderId; //your orderId
                    let requestId = response.refRequestId; //your requestId
                    //continue to submit momoToken,phonenumber to server
                } else {
                    me.setState({ description: "message: Get token fail", processing: false });
                }
            } catch (ex) { }

        });

        //OPTIONAL
        EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenState', (response) => {
            console.log("<MoMoPay>Listen.RequestTokenState:: " + response.status);
            // status = 1: Parameters valid & ready to open MoMo app.
            // status = 2: canOpenURL failed for URL MoMo app 
            // status = 3: Parameters invalid
        })
    }

    formatNumberToMoney(number, defaultNum, predicate) {
        predicate = !predicate ? "" : "" + predicate;
        if (number == 0 || number == '' || number == null || number == 'undefined' ||
            isNaN(number) === true ||
            number == '0' || number == '00' || number == '000')
            return "0" + predicate;

        var array = [];
        var result = '';
        var count = 0;

        if (!number) {
            return defaultNum ? defaultNum : "" + predicate
        }

        let flag1 = false;
        if (number < 0) {
            number = -number;
            flag1 = true;
        }

        var numberString = number.toString();
        if (numberString.length < 3) {
            return numberString + predicate;
        }

        for (let i = numberString.length - 1; i >= 0; i--) {
            count += 1;
            if (numberString[i] == "." || numberString[i] == ",") {
                array.push(',');
                count = 0;
            } else {
                array.push(numberString[i]);
            }
            if (count == 3 && i >= 1) {
                array.push('.');
                count = 0;
            }
        }

        for (let i = array.length - 1; i >= 0; i--) {
            result += array[i];
        }

        if (flag1)
            result = "-" + result;

        return result + predicate;
    }

    onPress = async () => {
        if (!this.state.processing) {
            let jsonData = {};
            jsonData.enviroment = "0"; //"0": SANBOX , "1": PRODUCTION
            jsonData.action = "gettoken";
            jsonData.isDev = true; //SANBOX only , remove this key on PRODUCTION 
            jsonData.merchantname = this.state.merchantname;
            jsonData.merchantcode = merchantcode;
            jsonData.merchantnamelabel = merchantNameLabel;
            jsonData.description = billdescription;
            jsonData.amount = this.state.amount;
            jsonData.orderId = "bill234284290348";
            jsonData.requestId = "your_requestId";
            jsonData.orderLabel = "Ma don hang";
            jsonData.appScheme = "momocgv20170101";// iOS App Only , get from Info.plist > key URL types > URL Schemes. Check Readme
            console.log("data_request_payment " + JSON.stringify(jsonData));
            if (Platform.OS === 'android') {
                let dataPayment = await RNMomosdk.requestPayment(jsonData);
                this.momoHandleResponse(dataPayment);
                console.log("data_request_payment " + dataPayment.status);
            } else {
                RNMomosdk.requestPayment(JSON.stringify(jsonData));
            }
            this.setState({ description: "", processing: true });
        }
        else {
            this.setState({ description: ".....", processing: false });
        }
    }

    async momoHandleResponse(response) {
        try {
            if (response && response.status == 0) {
                let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
                this.setState({ description: JSON.stringify(response), processing: false });
                let momoToken = response.data;
                let phonenumber = response.phonenumber;
                let message = response.message;
                //continue to submit momoToken,phonenumber to server
            } else {
                this.setState({ description: "message: Get token fail", processing: false });
            }
        } catch (ex) { }
    }

    onChangeText = (value) => {
        let newValue = value.replace(/\./g, "").trim();
        let amount = this.formatNumberToMoney(newValue, null, "");
        this.setState({ amount: newValue, textAmount: amount, description: "" });
    }

    render() {
        let { textAmount, description } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, marginTop: 50, backgroundColor: 'transparent' }}>
                <View style={styles.container}>
                    <Text style={[styles.text, { color: 'red', fontSize: 20 }]}>{"MOMO DEVELOPMENT"}</Text>
                    <Text style={[styles.text, { color: 'red', fontSize: 18 }]}>{"React native version"}</Text>
                    <Text style={[styles.text, { color: '#000', fontSize: 14, marginVertical: 5, textAlign: 'left', marginTop: 20 }]}>{"Mã đơn hàng : " + merchantcode}</Text>
                    <Text style={[styles.text, { color: '#000', fontSize: 14, marginVertical: 5, textAlign: 'left' }]}>{merchantNameLabel + " : " + merchantname}</Text>
                    <Text style={[styles.text, { color: '#000', fontSize: 14, marginVertical: 5, textAlign: 'left' }]}>{"Description : " + billdescription}</Text>
                    <View style={styles.formInput}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ flex: 1, fontSize: 18, paddingHorizontal: 10 }}>{"Total amount"}</Text>
                            <TextInput
                                autoFocus={true}
                                maxLength={10}
                                placeholderTextColor={"#929292"}
                                placeholder={"Enter amount"}
                                keyboardType={"numeric"}
                                returnKeyType="done"
                                value={textAmount == 0 ? "" : textAmount}
                                style={[styles.textInput, { flex: 1, paddingRight: 30 }]}
                                onChangeText={this.onChangeText}
                                underlineColorAndroid="transparent"
                            />
                            <Text style={{ position: 'absolute', right: 20, fontSize: 30 }}>{"đ"}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={this.onPress} style={styles.button} >
                        {
                            this.state.processing ?
                                <Text style={styles.textGrey}>Waiting response from MoMo App</Text>
                                :
                                <Text style={styles.text}>Confirm Payment</Text>
                        }
                    </TouchableOpacity>
                    {this.state.processing ?
                        <ActivityIndicator size="small" color="#000" />
                        : null
                    }
                    {
                        description != "" ?
                            <Text style={[styles.text, { color: 'red' }]}>{description}</Text>
                            : null
                    }
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    textInput: {
        fontSize: 16,
        marginHorizontal: 15,
        marginTop: 5,
        height: 40,
        paddingBottom: 2,
        borderBottomColor: '#dadada',
        borderBottomWidth: 1,
    },
    formInput: {
        backgroundColor: '#FFF',
        borderBottomColor: '#dadada',
        borderTopColor: '#dadada',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#b0006d',
        borderRadius: 4,
        marginHorizontal: 40,
        marginVertical: 10
    },
    text: {
        color: "#FFFFFF",
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 10
    },
    textGrey: {
        color: "grey",
        fontSize: 18,
        textAlign: 'center',
    }
});

export default withNavigation(MomoPayment)