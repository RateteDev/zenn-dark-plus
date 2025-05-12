// import { storage } from "wxt/storage";

const STORAGE_KEY = "local:extension_enabled";

/**
 * 拡張機能ON/OFF状態を管理するクラス
 */
export class ExtensionEnabledSetting {
    /**
     * ON/OFF状態を取得
     */
    static async get(): Promise<boolean> {
        const value = await storage.getItem<boolean>(STORAGE_KEY);
        return value !== false; // デフォルトはON
    }

    /**
     * ON/OFF状態を保存
     */
    static async set(enabled: boolean): Promise<void> {
        await storage.setItem(STORAGE_KEY, enabled);
    }

    /**
     * ON/OFF状態をトグル
     */
    static async toggle(): Promise<boolean> {
        const current = await this.get();
        const next = !current;
        await this.set(next);
        return next;
    }

    /**
     * ON/OFF状態の監視
     */
    static watch(callback: (enabled: boolean) => void): void {
        storage.watch<boolean>(STORAGE_KEY, (value: boolean | null) => {
            callback(value !== false);
        });
    }
}
