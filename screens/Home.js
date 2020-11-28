import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Movies from '../components/Movies'
import Tabs from '../components/Tabs'
import EventSlideshow from '../components/EventSlideshow'
import oldLeDo from '../assets/LeDoCinemaOldday.png'
import newLeDo from '../assets/LeDoCinemaNow.png'
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import moveek from '../assets/moveek.png'
import momo from '../assets/momo.png'
import danang from '../assets/danang.png'
import dolby from '../assets/dolbyAtmos.png'
import premiumCine from '../assets/premiumCinema.png'

export default class Home extends Component {
    render() {
        return (
        <View style={{
            height: '100%',
            width: "100%",
            backgroundColor: 'white',
            fontFamily: 'UTMAvo'
        }}>
            <ScrollView style={{
                height: innerHeight - 100,
                width: "100%",
                backgroundColor: 'white',
                fontFamily: 'UTMAvo'
            }}>
                <EventSlideshow />
                <Text style={styles.headText}>PHIM ĐANG CHIẾU</Text>
                <Movies />
                <Text style={styles.headText}>VỀ RẠP LÊ ĐỘ</Text>
                <Text style={{ paddingHorizontal: '10px' }}>Nằm ngay khu vực trung tâm ở mặt tiền đường Trần Phú, quận Hải Châu, TP Đà Nẵng,
                rạp phim Lê Độ có lịch sử lâu đời, là rạp phim quốc doanh duy nhất ra đời từ trước 1975.</Text>
                <Image style={{ height: Dimensions.get('window').width/905*279, width: '98%', resizeMode: 'cover', marginHorizontal: '1%' }} source={oldLeDo} />
                <Text style={{ paddingHorizontal: '10px' }}>
                    Lãnh đạo UBND TP Đà Nẵng cho rằng, rạp Lê Độ là một trong những thiết chế văn hoá
                    duy nhất còn lại từ các thập niên trước. Qua nhiều năm sử dụng, công trình đã xuống
                    cấp, hư hỏng, hệ thống trang thiết bị của rạp đã quá lạc hậu ảnh hưởng đến hoạt động
                    của rạp. Vì vậy, việc đầu tư cải tạo, nâng cấp Rạp Lê Độ là rất cần thiết nhằm đảm bảo
                    điều kiện cơ sở vật chất để rạp tiếp tục hoạt động phù hợp với sự phát triển của ngành
                    điện ảnh, đảm bảo phục vụ tốt nhu cầu vui chơi, giải trí của người dân và thực hiện
                các nhiệm vụ chính trị của thành phố.</Text>
                <Image style={{ height: Dimensions.get('window').width/501*315, width: '98%', resizeMode: 'cover', marginHorizontal: '1%' }} source={newLeDo} />
                <Text style={{ paddingHorizontal: '10px' }}>Đến 7-2018, Chủ tịch UBND TP Đà Nẵng Huỳnh Đức Thơ đã phê duyệt chủ trương nâng
                cấp rạp này với kinh phí đầu tư gần 5 tỉ đồng từ nguồn vốn ngân sách. Sau gần 1 năm
                thi công, đến cuối 2019, rạp Lê Độ được bàn giao và đưa vào sử dụng.</Text>
                <Text style={styles.headText}>ĐƠN VỊ HỢP TÁC</Text>
                <Text style={{width: '100%', textAlign: 'center', paddingBottom: '30px', paddingTop: '10px'}}>
                    <Image style={{ height: 30, width: 30/63*245, resizeMode: 'cover', marginHorizontal: '10px', marginVertical: '5px' }} source={moveek} />
                    <Image style={{ height: 30, width: 30, resizeMode: 'cover', marginHorizontal: '10px', marginVertical: '5px' }} source={momo} />
                    <Image style={{ height: 30, width: 30/95*125, resizeMode: 'cover', marginHorizontal: '10px', marginVertical: '5px' }} source={danang} />
                    <Image style={{ height: 30, width: 30/72*280, resizeMode: 'cover', marginHorizontal: '10px', marginVertical: '5px' }} source={dolby} />
                    <Image style={{ height: 30, width: 30/84*294, resizeMode: 'cover', marginHorizontal: '10px', marginVertical: '5px' }} source={premiumCine} />
                </Text>
            </ScrollView>
            <Tabs />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        backgroundColor: '#fff',
        alignItems: 'center',
        height: "100%",
        width: "100%"
    },
    headText: { fontFamily: 'UTMAvoBold', marginLeft: 10, marginTop: 10, fontSize: '20px', color: "rgb(255,215,70)" }
});
