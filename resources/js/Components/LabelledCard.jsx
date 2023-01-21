const LabelledCard = ({ label, value }) => (
    <div className='p-2 border border-gray-200 shadow-sm rounded-xl'>
        <p className="text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
    </div>
)

export default LabelledCard;
