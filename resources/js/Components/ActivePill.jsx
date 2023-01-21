const ActivePill = ({ active, label }) => (
    <div className={"p-2 text-center border shadow-sm rounded-xl " + (active ? 'border-indigo-400' : 'border-gray-200 text-gray-300')}>
        {label}
    </div>
)

export default ActivePill;
