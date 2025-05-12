import { LOCAL_STORAGE_KEY, IS_ENABLED_CLASS_NAME } from "../utils/define";
import { DarkModeSetting } from "./DarkModeSetting";

/**
 * ダークモード状態を管理するクラス
 */
export class DarkModeManager {
    private isEnabled: boolean = false;

    /**
     * ダークモード状態を初期化
     */
    public async initialize(): Promise<void> {
        this.isEnabled = await DarkModeSetting.get();
        this._applyStyles();
    }

    /**
     * ダークモード状態を取得
     * @returns ダークモード状態
     */
    public getIsEnabled(): boolean {
        return this.isEnabled;
    }

    /**
     * ダークモード状態をトグル
     */
    public async toggle(): Promise<void> {
        this.isEnabled = await DarkModeSetting.toggle();
        this._applyStyles();
    }

    /**
     * ダークモードを有効化
     */
    public async enable(): Promise<void> {
        if (!this.isEnabled) {
            this.isEnabled = true;
            await DarkModeSetting.set(true);
            this._applyStyles();
        }
    }

    /**
     * ダークモードを無効化
     */
    public async disable(): Promise<void> {
        if (this.isEnabled) {
            this.isEnabled = false;
            await DarkModeSetting.set(false);
            this._applyStyles();
        }
    }

    /**
     * スタイル適用（html要素のクラス操作）
     * @private
     */
    private _applyStyles(): void {
        const html = document.documentElement;
        if (this.isEnabled) {
            html.classList.add(IS_ENABLED_CLASS_NAME);
        } else {
            html.classList.remove(IS_ENABLED_CLASS_NAME);
        }
    }
}
