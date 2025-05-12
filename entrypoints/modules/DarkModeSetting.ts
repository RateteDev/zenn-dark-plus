import { LOCAL_STORAGE_KEY } from "../utils/define"

const STORAGE_KEY = `local:${LOCAL_STORAGE_KEY}`;

/**
 * ダークモード設定を管理するクラス
 */
export class DarkModeSetting {
    /**
     * ダークモード設定を取得
     * @returns ダークモード設定
     */
    static async get(): Promise<boolean> {
        const value = await storage.getItem<boolean>(STORAGE_KEY);
        return value === true;
    }

    /**
     * ダークモード設定を保存
     * @param enabled ダークモード設定
     */
    static async set(enabled: boolean): Promise<void> {
        await storage.setItem(STORAGE_KEY, enabled);
    }

    /**
     * ダークモード設定をトグル
     * @returns トグル後のダークモード設定
     */
    static async toggle(): Promise<boolean> {
        const current = await this.get();
        const next = !current;
        await this.set(next);
        return next;
    }
}
