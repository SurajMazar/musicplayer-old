export const secondsToMinutes = (time:number) => {
    let second:any = Math.floor(time % 60);
    if(second<10) second = '0'+second;
    return Math.floor(time / 60) + ':' + second;
}


export const isEmpty = (obj:any) => {
  for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};