import { IS_USE_SYSTEM_THEME_KEY } from "../utils/define"

const STORAGE_KEY = `local:${IS_USE_SYSTEM_THEME_KEY}`;

/**
 * システムテーマ利用設定を管理するクラス
 */
export class UseSystemThemeSetting {
    /**
     * システムテーマ利用設定を取得
     * @returns システムテーマ利用設定
     */
    static async get(): Promise<boolean> {
        const value = await storage.getItem<boolean>(STORAGE_KEY);
        return value === true;
    }

    /**
     * システムテーマ利用設定を保存
     * @param use システムテーマ利用設定
     */
    static async set(use: boolean): Promise<void> {
        await storage.setItem(STORAGE_KEY, use);
    }

    /**
     * システムテーマ利用設定をトグル
     * @returns トグル後のシステムテーマ利用設定
     */
    static async toggle(): Promise<boolean> {
        const current = await this.get();
        const next = !current;
        await this.set(next);
        return next;
    }

    /**
     * システムのダークモード状態を取得
     * @returns システムがダークモードかどうか
     */
    static isSystemDark(): boolean {
        if (window.matchMedia) {
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    }
}
