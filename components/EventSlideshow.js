import React, {Component} from 'react'
import { Dimensions } from 'react-native';
import Slideshow from 'react-native-slideshow'
import DOMAIN from '../domain'
import { withNavigation } from 'react-navigation';

class EventSlideshow extends Component {
    constructor(props) {
      super(props);
   
      this.state = {
        position: 1,
        interval: 5000,
        dataSource: [
          {
            title: '',
            caption: '',
            url: 'http://placeimg.com/640/480/any',
          }, {
            title: '',
            caption: '',
            url: 'http://placeimg.com/640/480/any',
          }, {
            title: '',
            caption: '',
            url: 'http://placeimg.com/640/480/any',
          },
        ],
        events: []
      };
    }

    componentDidMount() {
        fetch(`${DOMAIN.api}/event/all`, {method: 'GET'}).then(res => res.json())
          .then(data => {
            this.setState({events:data})
            data=data.slice(0,4).map(e => {
                if(e.cover_image.indexOf('http')==-1) {
                  e.cover_image=(`${DOMAIN.api}/`+e.cover_image).replace('\\','/')
                }
                return({
                    title: "",
                    url: e.cover_image
                })
            })
            this.setState({dataSource:data})
          })
    }
   
    UNSAFE_componentWillMount() {
      this.setState({
        interval: setInterval(() => {
          this.setState({
            position: (this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1)
          });
        }, 2000)
      });
    }
   
    UNSAFE_componentWillUnmount() {
      clearInterval(this.state.interval);
    }
   
    render() {
      return (
      <Slideshow 
          height={Dimensions.get('window').width/16*9}
          dataSource={this.state.dataSource}
          position={this.state.position}
          onPress={position => {
            this.props.navigation.navigate('DetailEvent',{event:this.state.events[position.index].slug})
          }}
          onPositionChanged={position => this.setState({ position })} />
      );
    }
  }

  export default withNavigation(EventSlideshow)