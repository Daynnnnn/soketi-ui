import { Pencil } from "phosphor-react";

const EditButton = ({ onClick, href }) => (
    <a onClick={onClick} href={href} className="bg-indigo-500 p-1 rounded-full cursor-pointer">
        <Pencil color="white" />
    </a>
)

export default EditButton;
