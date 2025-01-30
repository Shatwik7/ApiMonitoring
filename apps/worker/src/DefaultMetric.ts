import { performance } from "perf_hooks";
import dns from "dns";
import { URL } from "url";
import { API, APICheckResult } from "./GetMetric";
import { defaultIncidentHandler } from "./incidentHandler";
import { resolveIncidentHandler } from "./resolveIncident";

export async function DefaultFindMetric(api: API): Promise<APICheckResult | null> {
    let statusCode = 0;
    const timeout = api.request_timeout || 30000;
    try {
        const { id, url, method } = api;
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;

        performance.mark('start');

        performance.mark('dnsStart');
        const dnsStart = performance.now();
        try {
            await dns.promises.lookup(hostname);
        } catch (error) {
            throw new Error(`DNS lookup failed for ${hostname}: ${error}`);
        }
        performance.mark('dnsEnd');
        const dnsLookupTime = performance.measure('dnsLookup', 'dnsStart', 'dnsEnd').duration;

        const abortController = new AbortController();
        const timeoutId = setTimeout(() => abortController.abort(), timeout);

        performance.mark('fetchStart');
        const fetchStart = performance.now();
        let response: Response;
        try {
            response = await fetch(url, {
                method,
                signal: abortController.signal,
            });
        } catch (error) {
            if ( error instanceof Error  &&error.name === 'AbortError') {
                throw new Error(`Request timed out after ${timeout}ms`);
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
        statusCode = response.status;
        console.log(statusCode);
        if (api.statusCode !== null && statusCode !== api.statusCode) {
            throw new Error(`Expected status code ${api.statusCode}, but got ${statusCode}`);
        }

        const data = await response.text();
        performance.mark('fetchEnd');
        const fetchDuration = performance.measure('fetch', 'fetchStart', 'fetchEnd').duration;

        const tcpConnectionTime = fetchStart - dnsStart;
        const tlsHandshakeTime = fetchDuration - tcpConnectionTime;
        performance.mark('end');
        const totalTime = performance.measure('total', 'start', 'end').duration;
        
        if(!api.live) resolveIncidentHandler(api.id); 
        
        return {
            apiId: id,
            dnsLookupTime,
            tcpConnectionTime,
            tlsHandshakeTime,
            statusCode: response.status,
            totalTime,
            live:true,
            region: 'europe',
        };
    } catch (error) {
        if (!api.live) return null;
        defaultIncidentHandler(error, api, statusCode);
        return null;
    }
}
const api: API = {
    id: 1,
    url: 'https://example.com/api/data',
    checkInterval: 60000,
    nextCheck: null,
    live: true,
    userId: 123,
    method: 'POST',
    statusCode: 200,
    request_timeout: 30000,
    domainExpiration: null,
    sslExpiration: null,
};

DefaultFindMetric(api).then(result => {
    console.log(result);
}).catch(error => {
    console.error('Error checking API:', error);
});