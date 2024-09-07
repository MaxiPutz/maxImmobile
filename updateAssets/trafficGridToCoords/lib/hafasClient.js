import {createClient} from 'hafas-client'
import {profile as dbProfile} from 'hafas-client/p/db/index.js'
//import {profile as dbProfile} from "hafas-client/p/oebb/index.js"

// Your user agent string, adapt this to your project
const userAgent = 'firstTry'

// Create a client with the Deutsche Bahn profile
export const client = createClient(dbProfile, userAgent)