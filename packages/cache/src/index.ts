import { createClient,SetOptions } from 'redis';
import {API,User} from '@prisma/client';

const client=createClient({
    url: process.env.REDIS_URL||'redis://localhost:6379'
});
client.on("error", (err) => {
    console.error("Redis Client Error", err);
  });
  

async function connectRedis() {
  await client.connect();
  console.log("Connected to Redis");
}
connectRedis();

/**
 * a logical Lock is placed to prevent that multiple request to AlertServer
 * @param id api_id for acuring the lock
 * @returns Boolean -> if true -> no new Incident has been created / if false -> a incident is already in place
 * 
 */
export async function LockOnIncident(id:number):Promise<boolean>{
    const incident=await client.set(`active_incident:${id}`,'locked',{
        NX:true,
    })
    if(!incident) return false;
    return true;
}

/**
 * 
 * @param id api_id for
 * @returns 
 */
export async function UnlockOnIncident(id: number): Promise<boolean> {
    const deleted = await client.del(`active_incident:${id}`);
    return deleted > 0; // Returns true if the key was deleted, false otherwise
}



/**
 * cache the api data
 * @param data API from prisma
 * @returns string
 */
export async function CacheAPI(data:API):Promise<string|null> {
    return client.set(`api:${data.id}`,JSON.stringify(data),{EX: 30});
}


/**
 * Hit the cache for stored API data
 * @param id api_id 
 * @returns API data
 */
export async function HitForAPI(id:string):Promise<API|null>{
    const api=await client.get(`api:${id}`);
    if(api==null) return null;
    return JSON.parse(api) as API;
}


/**
 * Cache the user Data
 * @param data User
 * @returns 
 */
export async function CacheUser(data:User) :Promise<string|null>{
    return client.set(`user:${data.id}`,JSON.stringify(data),{EX: 30});
}


/**
 * Hit for the user data
 * @param id user id 
 * @returns 
 */
export async function HitForUser(id:number) {
    const user=await client.get(`user:${id}`);
    if(user==null) return null;
    await client.expire(`user:${id}`, 30);
    return JSON.parse(user) as User;
}
