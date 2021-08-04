import { ThemeContext } from "./../../contexts";

/**
 * 
 * @param {JSX.Element} WrappedComponent
 * @returns function
 */
export const withTheme = WrappedComponent => (
    
    /**
     * 
     * @param {object} props 
     * @returns JSX.Element
     */
    props => (
        <ThemeContext.Consumer>
            { theme => <WrappedComponent theme={theme} {...props} /> }
        </ThemeContext.Consumer>
    )
)
