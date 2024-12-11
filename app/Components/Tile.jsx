import React from 'react';

const Tile = ({ character, playerLoc, indexX, indexY, lastMove }) => {

  const getClass = () => {
    if(character == "W") {
      return "water";
    }
    else if(character == "L") {
      return "land";
    }
  }

  return (
    <div className={`tile ${getClass()}`}>
      {(playerLoc[0] === indexX && playerLoc[1] === indexY)?
      <div className={`player player-${lastMove}`}>
        {/* {character} */}
      </div>
      : "" }
    </div>
  );
};

export default Tile;
