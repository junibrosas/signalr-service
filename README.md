# SignalR Client

A micro service for SignalR JavaScript client wrapped in Typescript.


# How It Works
```javaScript
import { SocketService } from './service';
import { ISocketService } from './interfaces';

let service:ISocketService = new SocketService({
    IsLogging: true,
    HostUrl: '[host_url]';
});

service.Connect((connected) => {
    console.log(connected);
})

service.Subscribe('SomeEvent', (response) => {
    console.log(response);
});

service.Subscribe('EventNotExists', (response) => {
    console.log(response);
});

service.Disconnect();
```
