/** Case will return True */
// let arrivals: Array<any> = [1,3,7,9];
// let departures: Array<any> = [2,6,10];

/** Case will return False */
let arrivals: Array<any> = [1,3,5,9];
let departures: Array<any> = [2,6,10];

const totalRooms: number = 2;

/** Idea: check avaiable rooms with total rooms if still have room for rent 
 *        will pass true although guests before still not departure
 *        case false will fire if total rooms eq 0, but next-arrival-date less than last departure day
 */

let handleTotalRooms = (avaiRooms: number, nextArrival: number, departDate: number) => {
  if(avaiRooms === totalRooms) {
  	return avaiRooms;
  } else {
  	if(nextArrival < departDate) {
      return --avaiRooms;
    } else {
      return ++avaiRooms;
    }
  }
}

let handleBooking = (arrivals: Array<any>, departures: Array<any>, totalRooms: number): Promise<any> => {
	return new Promise<any>(resolve => {
  	let isFit: any = null;
    let avaiRooms = totalRooms - 1;		// First room take at first day
  	arrivals.map((takeRoomDate: any, inx: any) => {
      let departDate = departures[inx];
     	let nextArrival = arrivals[++inx];
      avaiRooms = handleTotalRooms(avaiRooms, nextArrival, departDate)
      console.log("avaiRooms: ", avaiRooms);
      debugger;
      if(nextArrival != undefined) {
      	let condi1 = (nextArrival - takeRoomDate) > (departDate - takeRoomDate);
        let condi2 = avaiRooms >= 0;
        debugger;
      	if( condi1 || condi2 ) {
        	avaiRooms -= 1;
          isFit = true;
        } else {
          isFit = false;
        }
        // Will resolve at first isFit eq false
        if(!isFit) {
          resolve(isFit);
        }
      }
    });
    // This resolve case will expect return isFit eq true
    resolve(isFit);
  })
}

handleBooking(arrivals, departures, totalRooms)
.then(res => {
	console.log("result: ", res);
});