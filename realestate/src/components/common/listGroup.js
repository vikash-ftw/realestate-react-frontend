import React from 'react';

const ListGroup = (props) => {
    const {items, valueProperty, textProperty, selectedItem} = props;
    return (
        <ul className="list-group">
            {items.map(item => (
                <li  
                    key={item[valueProperty]} 
                    onClick={() => props.onItemSelect(item)} 
                    className={item === selectedItem? "list-group-item active":"list-group-item"}>
                        {item[textProperty]}
                </li>
            ))}
            
        </ul>
    );
}

ListGroup.defaultProps = {
    valueProperty : "_id",
    textProperty : "name"
}
export default ListGroup;