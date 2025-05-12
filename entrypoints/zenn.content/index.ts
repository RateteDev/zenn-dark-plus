import { DarkModeManager } from "../modules/DarkModeManager"
import { UseSystemThemeSetting } from "../modules/UseSystemThemeSetting"
import { ThemeToggleButton } from "../components/ThemeToggleButton"
import { LOCAL_STORAGE_KEY } from "../utils/define"
import { ExtensionEnabledSetting } from "../modules/ExtensionEnabledSetting"

const mainZenn = async () => {
    // 拡張機能ON/OFF状態を確認
    const enabled = await ExtensionEnabledSetting.get();
    if (!enabled) {
        // OFFなら何もせずreturn
        return;
    }

    // ダークモードの管理
    const darkModeManager = new DarkModeManager();

    // システムのダークモード利用設定を取得（初回のみ）
    const useSystem = await UseSystemThemeSetting.get();

    // システムダークモードの状態を取得し、初回のみ反映
    if (useSystem) {
        if (UseSystemThemeSetting.isSystemDark()) {
            await darkModeManager.enable();
        } else {
            await darkModeManager.disable();
        }
    } else {
        await darkModeManager.initialize();
    }

    // ボタン要素
    const themeToggleButton = new ThemeToggleButton({
        isDarkMode: darkModeManager.getIsEnabled(),
        onClick: async () => {
            // ボタン押下時は通常通りダークモード状態をトグル
            await darkModeManager.toggle();
            themeToggleButton.render(darkModeManager.getIsEnabled());
        }
    });

    themeToggleButton.render(darkModeManager.getIsEnabled());
    themeToggleButton.appendToPage();

    // WXTのstorage.watchで他タブやpopupからの変更も即時反映
    storage.watch<boolean>(`local:${LOCAL_STORAGE_KEY}`, async (newValue) => {
        await (newValue ? darkModeManager.enable() : darkModeManager.disable());
        themeToggleButton.render(darkModeManager.getIsEnabled());
    });
}

import "./style.css"

export default defineContentScript({
    matches: ['*://*.zenn.dev/**'],
    main(ctx) {
        // 拡張機能ON/OFF状態の監視
        ExtensionEnabledSetting.watch((enabled) => {
            // ON/OFF切り替え時はページリロード
            location.reload();
        });
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", mainZenn);
        } else {
            mainZenn();
        }
    },
});
