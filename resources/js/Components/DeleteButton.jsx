import { Trash } from "phosphor-react";

const DeleteButton = ({ onClick, href, className }) => (
    <a onClick={onClick} href={href} className={"bg-indigo-500 p-1 rounded-full cursor-pointer " + className}>
        <Trash color="white" />
    </a>
)

export default DeleteButton;
