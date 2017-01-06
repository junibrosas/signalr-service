import * as $ from 'jquery';
import * as jQuery from 'jquery';
import { ISocketService, ISocketPayload, ISocketOptions } from './interfaces';

// Ensure jQuery is referenced before the SignalR client JavaScript file.
window.$ = $;
window.jQuery = jQuery;

require('ms-signalr-client');
require('./hub');

/**
 * Refactor 0.0.1 based on the above type 'Service'.
 * 
 * Code Changes
 * - Mark those properties as private that are not required to be part of the public contract (typing).
 * - Implement the interface to ensure contractual agreement (typing).
 * - Use member methods rather than arrow functions as these are methods which should only be used against this class.
 * - Explicitly declare return types :void to communicate no return value (typing).
 * - Pass in options object for logging, url etc.
 * - Remove dependency on event emitter as we already have that in the signlar R lib with their promises (start()) and event handlers (newNotification).
 * 
 * Logic Changes
 * - Subscribe to the hub after connection internally within the class as we only need that single subscription.
 * - Maintain a list of subscriber handlers mapped to the event type.
 * - Allow explicit disconnection of the socket service.
 */

/**
 * A factory function to ensure we return the service as an interface to allow simple implementation swapping out at any point and reduce client coupling to our socket service.
 */
export function GetFactory(options: ISocketOptions): ISocketService
{
    var service = new SocketService(options);
    return service;
}

/**
 * Refactory version 0.0.0.1
 */
class SocketService implements ISocketService
{
    private subscriptions: { [key: string]: (response: any) => void } = {};
    private options: ISocketOptions;
    
    constructor(options: ISocketOptions)
    {
        this.options = options;
    }

    public Connect(callback?: (connected: boolean) => void): void
    {
        $.connection.hub.url = this.options.HostUrl;
        $.connection.hub.logging = this.options.IsLogging;

        $.connection.hub.start().done(() =>
        {
            if (callback)
                callback(true);
        })
        .fail(() =>
        {
            if (callback)
                callback(false);
        });
    }

    public Disconnect(): void
    {
        for (var key in this.subscriptions)
            delete this.subscriptions[key];

        $.connection.hub.stop();
    }

    public Subscribe<TPayload extends ISocketPayload>(eventType: string, callback: (response: TPayload) => void): void
    {
        this.subscriptions[eventType] = callback;

        this.OnConnected();
    }

    private OnConnected(): void
    {
        var notification = $.connection.notificationHub;

        notification.client.newNotification = (eventType: string, jsonPayload: any) =>
        {
            var handler = this.subscriptions[eventType];

            if(handler)
            {
                handler(JSON.parse(jsonPayload));
            }
        };
    }
}


export {
    SocketService
}
