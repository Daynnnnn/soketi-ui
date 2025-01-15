import { Pencil } from "phosphor-react";

const EditButton = ({ onClick, href, className }) => (
    <a onClick={onClick} href={href} className={"bg-indigo-500 p-1 rounded-full cursor-pointer " + className}>
        <Pencil color="white" />
    </a>
)

export default EditButton;
