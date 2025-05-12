import sunIcon from "../assets/sun.svg?raw";
import moonIcon from "../assets/moon.svg?raw";

type ThemeToggleButtonProps = {
    isDarkMode: boolean;
    onClick: () => void | Promise<void>;
};

export class ThemeToggleButton {
    public readonly buttonElement: HTMLButtonElement;
    private isDarkMode: boolean;
    private readonly onClick: () => void | Promise<void>;
    private readonly targetContainerSelector: string = "div.LoggedInArea_actions__Dkxmw";

    constructor(props: ThemeToggleButtonProps) {
        this.isDarkMode = props.isDarkMode;
        this.onClick = props.onClick;

        this.buttonElement = document.createElement("button");
        this._styleButton();
        this.buttonElement.addEventListener("click", this.onClick);
    }

    private _styleButton(): void {
        const style = this.buttonElement.style;
        style.marginLeft = "8px";
        style.padding = "0px";
        style.height = "36px";
        style.width = "36px";
        style.border = "none";
        style.borderRadius = "6px";
        style.background = "transparent";
        style.cursor = "pointer";
        style.display = "flex";
        style.alignItems = "center";
        style.justifyContent = "center";
    }

    public render(isDarkModeEnabled: boolean): void {
        this.isDarkMode = isDarkModeEnabled;
        this.buttonElement.innerHTML = isDarkModeEnabled ? sunIcon : moonIcon;
        const svgElement = this.buttonElement.querySelector("svg");
        if (svgElement) {
            (svgElement as SVGElement).style.width = "20px";
            (svgElement as SVGElement).style.height = "20px";
        }
    }

    public appendToPage(): void {
        // 共通のアクションエリアをターゲット
        const commonActionsArea = document.querySelector("div.AppHeader_actionsArea__3VI_s");
        if (commonActionsArea) {
            commonActionsArea.appendChild(this.buttonElement);
        }
        // fallbackは廃止
    }
}
