import { Redis } from "@upstash/redis";

const { REDIS_URL: url, REDIS_TOKEN: token } = process.env;

if (!url || !token) throw new Error("Redis credentials not set");

const redis = new Redis({ url, token });

export default redis;
