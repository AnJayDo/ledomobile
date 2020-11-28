import React, {Component} from 'react'
import Slideshow from 'react-native-slideshow'

export default class EventSlideshow extends Component {
    constructor(props) {
      super(props);
   
      this.state = {
        position: 1,
        interval: null,
        dataSource: [
          {
            title: 'Title 1',
            caption: 'Caption 1',
            url: 'http://placeimg.com/640/480/any',
          }, {
            title: 'Title 2',
            caption: 'Caption 2',
            url: 'http://placeimg.com/640/480/any',
          }, {
            title: 'Title 3',
            caption: 'Caption 3',
            url: 'http://placeimg.com/640/480/any',
          },
        ],
      };
    }

    componentDidMount() {
        fetch('http://localhost:3000/event/all', {method: 'GET'}).then(res => res.json())
          .then(data => {
            data=data.slice(0,4).map(e => {
                return({
                    title: e.name,
                    url: e.image.indexOf('http')==-1?('http://localhost:3000/'+e.image).replaceAll('\\','/'):e.image
                })
            })
            this.setState({dataSource:data})
          })
    }
   
    componentWillMount() {
      this.setState({
        interval: setInterval(() => {
          this.setState({
            position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
          });
        }, 2000)
      });
    }
   
    componentWillUnmount() {
      clearInterval(this.state.interval);
    }
   
    render() {
      return (
      <Slideshow 
          dataSource={this.state.dataSource}
          position={this.state.position}
          onPositionChanged={position => this.setState({ position })} />
      );
    }
  }