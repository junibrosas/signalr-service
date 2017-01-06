export interface ISocketPayload
{
    EventType: string;
}

export interface ISocketService 
{
    Connect(callback?: (connected: boolean) => void): void;
    Disconnect(): void;
    Subscribe<TPayload extends ISocketPayload>(eventType: string, callback: (response: TPayload) => void): void;
}

export interface IBookingCreatePayload extends ISocketPayload
{

}

export interface ISocketOptions
{
    IsLogging: boolean;
    HostUrl: string;
}
