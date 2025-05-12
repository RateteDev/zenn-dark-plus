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

    useEffect(() => {
        (async () => {
            setUseExtensionEnabled(await ExtensionEnabledSetting.get())
            setUseSystem(await UseSystemThemeSetting.get())
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
            <div className="popup-links">
                <div className="popup-links-title">Links</div>
                <div className="popup-links-icons">
                    <a className="popup-link-anchor" href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
                        <span className="icon-svg icon-svg-stroke" dangerouslySetInnerHTML={{ __html: chromeIcon }} />
                        <span className="popup-link-label">Chrome</span>
                    </a>
                    <a className="popup-link-anchor" href={FIREFOX_STORE_URL} target="_blank" rel="noopener noreferrer">
                        <span className="icon-svg icon-svg-fill" dangerouslySetInnerHTML={{ __html: firefoxIcon }} />
                        <span className="popup-link-label">Firefox</span>
                    </a>
                    <a className="popup-link-anchor" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                        <span className="icon-svg icon-svg-fill" dangerouslySetInnerHTML={{ __html: githubIcon }} />
                        <span className="popup-link-label">GitHub</span>
                    </a>
                </div>
            </div>
            <div className="popup-link-report">
                <a className="popup-link-report-anchor" href={ISSUE_URL} target="_blank" rel="noopener noreferrer">🔧 不具合報告</a>
                <span className="popup-version-bottom">v{EXT_VERSION}</span>
            </div>
            <div className="popup-meta">
            </div>
        </div>
    )
}

export default App
