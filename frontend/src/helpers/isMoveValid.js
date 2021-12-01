function isMoveValid(srcToDestPath, game) {
    let isLegal = true;
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (game[srcToDestPath[i]].piece !== null) {
        isLegal = false;
      }
    }
    return isLegal;
  }


  export default isMoveValid;