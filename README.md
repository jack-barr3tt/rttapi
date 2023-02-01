### About
rttapi is a [Node.JS](https://nodejs.org/) module for interacting with the [Realtime Trains API](https://api.rtt.io/).

### Example Usage
```js
// Set up the client
const client = new RTTClient("your-username", "your-password");

// Get location information and current services through London Euston
const london = await client.locations.at("EUS");

// Get information about a service with ID W98641 that ran on 31st January 2023
const service = await client.services.get("W98641", new Date(2023, 0, 31))
```

### Links
- [API Documentation](https://www.realtimetrains.co.uk/about/developer/pull/docs/)
- [Realtime Trains](https://www.realtimetrains.co.uk/)