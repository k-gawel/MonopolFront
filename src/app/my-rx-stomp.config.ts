import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';

console.log("WS URL", "ws://" + window.location.hostname + ":8080/monopol-server-0.0.2/" + "game-socket");

export const myRxStompConfig: InjectableRxStompConfig = {
    // Which server?
    brokerURL: "ws://" + window.location.hostname + ":8080/monopol-server-0.0.2/" + "game-socket",

    // Headers
    // Typical keys: login, passcode, host
    // connectHeaders: {
    //     login: 'guest',
    //     passcode: 'guest'
    // },

    // How often to heartbeat?
    // Interval in milliseconds, set to 0 to disable
    heartbeatIncoming: 0, // Typical value 0 - disabled
    heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

    // Wait in milliseconds before attempting auto reconnect
    // Set to 0 to disable
    // Typical value 500 (500 milli seconds)
    reconnectDelay: 200,

    // Will log diagnostics on console
    // It can be quite verbose, not recommended in production
    // Skip this key to stop logging to console
    // debug: (msg: string): void => {
    //     console.log(new Date(), msg);
    // }
};
