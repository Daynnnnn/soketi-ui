import { ArrowsClockwise } from "phosphor-react";

const RefreshButton = ({ onClick, href, className }) => (
    <a onClick={onClick} href={href} className={"bg-indigo-500 p-1 rounded-full cursor-pointer " + className}>
        <ArrowsClockwise color="white" />
    </a>
)

export default RefreshButton;
