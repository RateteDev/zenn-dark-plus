import { useEffect, useState } from "react"
import { UseSystemThemeSetting } from "../modules/UseSystemThemeSetting"
import { ExtensionEnabledSetting } from "../modules/ExtensionEnabledSetting"
import {
    EXT_VERSION,
    LICENSE_NAME,
    LICENSE_URL,
    CHROME_STORE_URL,
    FIREFOX_STORE_URL,
    GITHUB_URL,
    ISSUE_URL
} from "../utils/define"
import "./App.css"
import chromeIcon from "../assets/chrome.svg?raw"
import firefoxIcon from "../assets/firefox.svg?raw"
import githubIcon from "../assets/github.svg?raw"

const App = () => {
    const [useSystem, setUseSystem] = useState(false)
    const [useExtensionEnabled, setUseExtensionEnabled] = useState(true)
    const [loading, setLoading] = useState(true)
    const [windowsSystemDark, setWindowsSystemDark] = useState(false)

    useEffect(() => {
        (async () => {
            setUseExtensionEnabled(await ExtensionEnabledSetting.get())
            setUseSystem(await UseSystemThemeSetting.get())
            setWindowsSystemDark(UseSystemThemeSetting.isSystemDark())
            setLoading(false)
        })()
    }, [])

    const handleExtensionToggle = async () => {
        const newValue = !useExtensionEnabled
        setUseExtensionEnabled(newValue)
        await ExtensionEnabledSetting.set(newValue)
    }

    const handleSystemToggle = async () => {
        const newValue = !useSystem
        setUseSystem(newValue)
        await UseSystemThemeSetting.set(newValue)
    }

    if (loading)
        return <div className="container loading-text">Loading...</div>

    return (
        <div className="container">
            <h1 className="popup-title">Zenn Dark+</h1>
            <label className={useExtensionEnabled ? "popup-label active" : "popup-label"}>
                <input
                    type="checkbox"
                    checked={useExtensionEnabled}
                    onChange={handleExtensionToggle}
                    className="popup-checkbox"
                />
                拡張機能を有効化
            </label>
            <label className={useSystem ? "popup-label active" : "popup-label"}>
                <input
                    type="checkbox"
                    checked={useSystem}
                    onChange={handleSystemToggle}
                    className="popup-checkbox"
                    disabled={!useExtensionEnabled}
                />
                OSのテーマ設定に従う
            </label>
            <p className="theme-status">現在のOSのテーマ: {windowsSystemDark ? "ダーク" : "ライト"}</p>
            <div className="popup-links">
                <span>
                    <span className="icon-svg icon-svg-stroke" dangerouslySetInnerHTML={{ __html: chromeIcon }} />
                    Chrome Web Store: <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">Chrome</a>
                </span>
                <span>
                    <span className="icon-svg icon-svg-fill" dangerouslySetInnerHTML={{ __html: firefoxIcon }} />
                    Firefox Addons: <a href={FIREFOX_STORE_URL} target="_blank" rel="noopener noreferrer">Firefox</a>
                </span>
                <span>
                    <span className="icon-svg icon-svg-fill" dangerouslySetInnerHTML={{ __html: githubIcon }} />
                    GitHub: <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">RateteDev/zenn-dark-plus</a>
                </span>
                <span>
                    不具合報告: <a href={ISSUE_URL} target="_blank" rel="noopener noreferrer">GitHub Issues</a>
                </span>
            </div>
            <div className="popup-meta">
                <span className="popup-version">バージョン: {EXT_VERSION}</span>
                <span className="popup-license">
                    <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer">{LICENSE_NAME} License</a>
                </span>
            </div>
        </div>
    )
}

export default App
