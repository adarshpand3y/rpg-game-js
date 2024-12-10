import React from 'react';
import grass from './Images/grass.png';
import ocean from './Images/ocean.gif';

const Tile = ({ character, playerLoc, indexX, indexY }) => {

  const getBgUrl = () => {
    if (playerLoc[0] !== indexX || playerLoc[1] !== indexY) {
      // Current cell is not player
      if(character == "W") {
        return ocean.src;
      }
      else if(character == "L") {
        return grass.src;
      }
    }
    else return "#fff"
  }

  return (
    <div className='tile'
      style={{
        backgroundImage: `url(${getBgUrl()})`
      }}
    >
        {/* {character} */}
    </div>
  );
};

export default Tile;
