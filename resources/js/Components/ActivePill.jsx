const ActivePill = ({ active, label, onClick }) => (
    <div onClick={onClick ?? null} className={(onClick ? "cursor-pointer " : "") + "transition-all duration-150 p-2 text-center border shadow-sm rounded-xl " + (active ? 'border-indigo-400' : 'border-gray-200 text-gray-300')}>
        {label}
    </div>
)

export default ActivePill;
