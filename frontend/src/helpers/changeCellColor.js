function changeCellColor(cell, color, game) {
    return {
      ...game[cell].piece.style,
      backgroundColor: color,
    };
  }

  export default changeCellColor;