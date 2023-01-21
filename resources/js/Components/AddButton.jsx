import { Plus } from "phosphor-react";

const AddButton = ({ onClick, href }) => (
    <a onClick={onClick} href={href} className="bg-indigo-500 p-1 rounded-full cursor-pointer">
        <Plus color="white" weight="bold" />
    </a>
)

export default AddButton;
