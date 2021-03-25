import React, { isValidElement } from "react";
import { Carousel } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLng } from "leaflet";
import Axios from "axios";
import Register from './registrationChoice';

class Home extends React.Component {
  state = {
    propertyList: [],
  };
  componentDidMount() {
    Axios.get(`http://localhost:8080/realEstate/LandProperty`).then((res) => {
      const temp = res.data.map((p) => {
        return {
          lat: p.latitude,
          lon: p.longitude,
          title: p.propertyTitle,
          price: p.propertyPrice,
          area: p.propertyArea,
        };
      });
      console.log(res.data);
      console.log(temp, "home temp");
      this.setState({ propertyList: temp });
    });
  }
  render() {
    const position = [21.1458, 79.088158];
    const markerList = this.state.propertyList;
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Horizon Real Estate</h1>
        </div>
        {/* <div>
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={image} alt="First slide" />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={i2} alt="Second slide" />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={i3} alt="Third slide" />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div> */}
        <div className="row">
          {/* <div className="col-9"></div>
          <div className="col">
            <h4>Property Registered</h4>
          </div> */}
        </div>
        <h3><i>Land Property registered till now - </i></h3>
        <MapContainer center={position} zoom={6} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markerList.map((val, key) => (
            <Marker
              draggable={false}
              position={[val.lat, val.lon]}
              key={key}
              eventHandlers={{
                click: (e) => {
                  if (localStorage.getItem("actorId") === null) {
                    this.props.history.push("/login");
                  }
                },
              }}
            >
              <Popup>
                Title:{val.title} Area:{val.area} Price:{val.price}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }
}
export default Home;
