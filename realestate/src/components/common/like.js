import React, { Component } from 'react';

// input : liked => boolean
//Output : onClick event to do some change in database

class Like extends Component {
    state = {  }
    render() {
        let liked = false;
        Array.from(this.props.favProps).forEach((p)=>{
            if(p.propertyId === this.props.currentProp.propertyId){
                liked = true;
            }
        })
        let classes = "fa fa-star";
        if(!liked) classes+= "-o";
        return ( 
            <i onClick={this.props.onClick} style={ {cursor : 'pointer' }} className={classes} aria-hidden="true"></i>
         );
    }
}
 
export default Like;