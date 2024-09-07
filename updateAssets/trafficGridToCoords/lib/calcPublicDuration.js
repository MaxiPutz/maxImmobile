import { client } from "./hafasClient.js"
import { getNextMonday } from "./nextMondayAt6to10.js"

let isStationIdProcess = {

}



export async function calcPublicDuration (startId, endId) {
    console.log("startId", startId);
    console.log("endId", endId);
    
    if (isStationIdProcess[startId] ) {
        return isStationIdProcess[startId]
    }
    
    const { journeys } = await client.journeys(startId, endId, {
        departure: getNextMonday(),
        results: 4,
        stopovers: false,
        transfers: 0, // You can change this if you want to allow transfers
        //products: ['nationalExpress', 'regionalExpress', 'regional'], // Specify which type of trains to consider
        maxDuration: 60*4 // Max duration in minutes (4 hours)
    })

    const time = journeys.reduce( (prev, cur) => {
        /*const time = cur.legs.reduce( (prev2, cur2) => {
            const time = Math.floor( (new Date( cur2.arrival ) - new Date( cur2.departure ))  / 1000 / 60  )
            return prev2 < time ? prev2 : time
        }, 10000000)*/

        const firstLeg = cur.legs[0]
        const lastLeg = cur.legs[cur.legs.length -1]


        const time = ( new Date(lastLeg.arrival) - new Date(firstLeg.departure) ) / 1000 / 60

        return prev < time ? prev : time
    }, 10000000)

    isStationIdProcess[startId] = {
        time,
        journeys
    }

    return {
        time,
        journeys
    }
}

