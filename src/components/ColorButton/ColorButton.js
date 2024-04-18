export const ColorButton = ({ action, color, label }) => {

    return (
        <button className="color-selector" onClick={action}>
            <div className="color-swatch component-color-indicator" style={{ background: color }}></div>
            {label}
        </button>)
}
