export interface Matrix {
    value: string;
    select: boolean;
    disabled: boolean;
}

export interface Challenge {
    id: string;
    row: any[];
    read: number;
    resolve: boolean;
    fail: boolean;
    decorator: Decorator;
}

export interface Decorator {
    logo?: string,
    logoResolve?: string,
    logofail?: string,
    title?: string,
    description?: string
}

export enum TypeDecorator {
    DATAMINE_V1 = "DATAMINE_V1",
    DATAMINE_V2 = "DATAMINE_V2",
    DATAMINE_V3 = "DATAMINE_V3",
    ICEPICK_HAND = "ICEPICK_HAND",
    ICEPICK_PC = "ICEPICK_PC",
    ICEPICK_HEAD = "ICEPICK_HEAD",
    CAMERE_CONTROL = "CAMERE_CONTROL",
    CAMERE_OFF = "CAMERE_OFF",
    MASS_VULNERABILITY = "MASS_VULNERABILITY",
    MASS_COLLAPSE = "MASS_COLLAPSE",
    MALWARE = "MALWARE",
    MAINIG_v1 = "MAINIG_v1",
    MAINIG_v2 = "MAINIG_v2",
    CODING = "CODING",
    TURRET_SHORT_CIRCUIT = "TURRET_SHORT_CIRCUIT",
    TURRET_OFF = "TURRET_OFF",
    TURRET_CONTROL = "TURRET_CONTROL",
    REBOOT_OPTICAL = "REBOOT_OPTICAL",
    JAMMING = "JAMMING",
    CUSTOM = "CUSTOM"
}

export interface Level {
    id: string,
    name: string,
    timeLeft: string,
    bufferSize: number,
    matrix: Array<Matrix[]>,
    code: Challenge[]
}

export enum ElectronAction {
    FINDBYID = "FINDBYID",
    FINDALL = "FINDALL",
    ADDLEVEL = "ADDLEVEL",
    UPDATELEVEL = "UPDATELEVEL",
    DELETELEVEL = "DELETELEVEL",
    QUIT = "QUIT"
}

export enum ElectronEvent {
    GOT_NEW_REQUEST = 'GOT_NEW_REQUEST'
}