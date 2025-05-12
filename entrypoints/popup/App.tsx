import { useEffect, useState } from "react"
import { UseSystemThemeSetting } from "../modules/UseSystemThemeSetting"
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

const App = () => {
    const [useSystem, setUseSystem] = useState(false)
    const [loading, setLoading] = useState(true)
    const [windowsSystemDark, setWindowsSystemDark] = useState(false)

    useEffect(() => {
        (async () => {
            setUseSystem(await UseSystemThemeSetting.get())
            setWindowsSystemDark(UseSystemThemeSetting.isSystemDark())
            setLoading(false)
        })()
    }, [])

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
            <label className={useSystem ? "popup-label active" : "popup-label"}>
                <input
                    type="checkbox"
                    checked={useSystem}
                    onChange={handleSystemToggle}
                    className="popup-checkbox"
                />
                OSのテーマ設定に従う
            </label>
            <p className="theme-status">現在のOSのテーマ: {windowsSystemDark ? "ダーク" : "ライト"}</p>
            <div className="popup-links">
                <span>
                    Chrome Web Store: <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">Chrome</a>
                </span>
                <span>
                    Firefox Addons: <a href={FIREFOX_STORE_URL} target="_blank" rel="noopener noreferrer">Firefox</a>
                </span>
                <span>
                    GitHub: <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">~~</a>
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
