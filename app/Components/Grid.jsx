'use client';

import React from 'react';
import worldData from '../world.json';
import Tile from './Tile';
import { useState, useEffect } from 'react';

const Grid = () => {
    const debug = true;
    const { rows, cols, world } = worldData;
    const [playerLoc, setPlayerLoc] = useState([9, 9]);
    const [isKeyPressed, setIsKeyPressed] = useState(false);
    const [lastMove, setlastMove] = useState("d");

    const gridHeight = 9;
    const gridWidth = 15;

    const halfGridHeight = Math.floor(gridHeight / 2);
    const halfGridWidth = Math.floor(gridWidth / 2);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (isKeyPressed) return;

            const key = event.key.toLowerCase();
            setIsKeyPressed(true);

            setPlayerLoc((prevVal) => {
                let newCol = prevVal[1];
                let newRow = prevVal[0];
                let newPlayerLoc = [...prevVal];

                if (key === 'w' && world[newRow - 1] && world[newRow - 1][newCol] !== "W") {
                    newPlayerLoc = [Math.max(0, newRow - 1), newCol];
                    setlastMove("w");
                }
                else if (key === 's' && world[newRow + 1] && world[newRow + 1][newCol] !== "W") {
                    newPlayerLoc = [Math.min(worldData['rows'], newRow + 1), newCol];
                    setlastMove("s");
                }
                else if (key === 'a' && world[newRow] && world[newRow][newCol - 1] !== "W") {
                    newPlayerLoc = [newRow, Math.max(0, newCol - 1)];
                    setlastMove("a");
                }
                else if (key === 'd' && world[newRow] && world[newRow][newCol + 1] !== "W") {
                    newPlayerLoc = [newRow, Math.min(worldData['cols'], newCol + 1)];
                    setlastMove("d");
                }

                return newPlayerLoc;
            });

            // Throttling movement in case of key hold
            setTimeout(() => {
                setIsKeyPressed(false);
            }, 100);
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isKeyPressed]);

    const renderGrid = () => {
        const grid = [];
        const startRow = Math.max(0, playerLoc[0] - halfGridHeight);
        const endRow = Math.min(rows, playerLoc[0] + halfGridHeight + 1);

        const startCol = Math.max(0, playerLoc[1] - halfGridWidth);
        const endCol = Math.min(cols, playerLoc[1] + halfGridWidth + 1);

        for (let row = startRow; row < endRow; row++) {
            const rowTiles = [];
            for (let col = startCol; col < endCol; col++) {
                const tileKey = `${col},${row}`;
                const tile = world[row][col];
                rowTiles.push(
                    <Tile
                        key={tileKey}
                        character={tile}
                        indexX={row}
                        indexY={col}
                        playerLoc={playerLoc}
                        lastMove={lastMove}
                    />
                );
            }
            grid.push(
                <div key={row} className='row-tiles'>
                    {rowTiles}
                </div>
            );
        }
        return grid;
    };

    return (
        <>
            <div className='grid'>
                {renderGrid()}
            </div>
            {debug && <p>DEBUG PosX: {playerLoc[0]}, PosY: {playerLoc[1]}, halfGridHeight: {halfGridHeight}, halfGridWidth: {halfGridWidth}</p>}
            {debug && <p>DEBUG Last move: {lastMove}</p>}
        </>
    );
};

export default Grid;
