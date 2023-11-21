import { Injectable } from '@angular/core';
import { ElectronAction, ElectronEvent } from "../models/comon.model";

interface IpcAPI extends Window {
  send(electronAction: ElectronAction, ...args: any[]): void;

  invoke(electronAction: ElectronAction, ...args: any[]): Promise<any>;

  on(electronEvent: ElectronEvent, listener: (...args: any) => any): void;

  removeListener(electronEvent: ElectronEvent, listener: (...args: any[]) => void): void;

  removeAllListeners(electronEvent: ElectronEvent): void;
}

@Injectable({
  providedIn: 'root'
})
export class ControlerSqllite3Service {
  private readonly api: IpcAPI = (window as any).api;

  /**
   * Costruttore
   * @param spinnerService Service per la gestione, richiesta e disposizione dello spinner di caricamento
   */
  constructor() { }

  isElectronApp(): boolean {
    return !!this.api;
  }

  sendAction(electronAction: ElectronAction, ...args: any[]): void {
    if (this.isElectronApp()) {
      this.api.send(electronAction, ...args);
    } else {
      throw new Error('This is not an electron app');
    }
  }

  invokeAction(electronAction: ElectronAction, ...args: any[]): Promise<any> {
    if (this.isElectronApp()) {
      return this.api.invoke(electronAction, ...args);
    } else {
      return Promise.reject('This is not an electron app');
    }
  }

  onEvent(electronEvent: ElectronEvent, listener: (...args: any[]) => any): void {
    if (this.isElectronApp()) {
      return this.api.on(electronEvent, listener);
    } else {
      throw new Error('This is not an electron app');
    }
  }

  removeEventListener(electronEvent: ElectronEvent, listener: (...args: any[]) => any): void {
    if (this.isElectronApp()) {
      return this.api.removeListener(electronEvent, listener);
    } else {
      throw new Error('This is not an electron app');
    }
  }

  removeAllEventListeners(electronEvent: ElectronEvent): void {
    if (this.isElectronApp()) {
      return this.api.removeAllListeners(electronEvent);
    } else {
      throw new Error('This is not an electron app');
    }
  }
}