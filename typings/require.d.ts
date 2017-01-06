interface Window { 
    $: any; 
    jQuery: any;
}

interface JQueryStatic {
    connection: any;
}

declare var require: {
    (path: string): any;
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

declare interface ObjectConstructor {
    assign(...objects: any[]): any;
}

