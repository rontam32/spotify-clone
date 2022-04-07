import { GenericProps } from "../../../models/Application";

const TopPaddingContainer = ({ cssClass, children }: GenericProps<{cssClass?: string}>) => {
    return <div style={{paddingTop: '64px'}} className={cssClass ? cssClass : ''}>
        {children}
    </div>
}

export default TopPaddingContainer;