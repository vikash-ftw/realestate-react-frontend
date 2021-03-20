import React, { Component } from 'react';
// like component
import Like from './common/like';

class PropertyTable extends Component {


  render() { 
      const { properties, onLike } = this.props;

      return (
        <table className="table">
          <thead>
            <tr>
              <th>Area</th>
              <th>Dimension Length</th>
              <th>Dimension Breadth</th>
              <th>Price</th>
              <th>City</th>
              <th>Pincode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop) => (
              <tr key={prop.propertyId}>
                <td>{prop.propertyArea}</td>
                <td>{prop.dimensionLength}</td>
                <td>{prop.dimensionBreadth}</td>
                <td>{prop.propertyPrice}</td>
                <td>{prop.propertyCity}</td>
                <td>{prop.propertyPincode}</td>
                <td>
                  <Like
                    liked={prop.liked}
                    onClick={() => onLike(prop)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
  }
}
 
export default PropertyTable;
