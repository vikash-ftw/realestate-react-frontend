import React from "react";
import image from "../images/image.jpg";
import i2 from "../images/i2.jpg";
import i3 from "../images/i3.jpg";
import { Carousel } from "react-bootstrap";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Horizon Real Estate</h1>
        </div>
        <div>
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
        </div>
      </div>
    );
  }
}
export default Home;
