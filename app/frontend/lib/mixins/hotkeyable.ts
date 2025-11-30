import hotkeys from "hotkeys-js";
import { LitElement } from "lit";

type Constructor<T> = new (...args: any[]) => T;
export declare class HotkeyableInterface {}

export const Hotkeyable = <T extends Constructor<LitElement>>(superClass: T) => {
  class HotkeyableElement extends superClass {
    static hotkeyScope = "all";

    protected registerHotkey(key, opts, handler = null) {
      if (handler == null) {
        handler = opts;
        opts = {};
      }

      opts.scope = this.getStaticProperty("hotkeyScope");

      hotkeys(key, opts, handler);
      this.addCleanupJob(() => hotkeys.unbind(key, opts.scope));
    }
  }

  return HotkeyableElement as Constructor<HotkeyableInterface> & T;
};
