const Status = ({ text, icon: Icon, bg, color }) => {
    return (
      <div
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium text-sm ${bg} ${color}`}
      >
        {text}
        <Icon size={14} />
      </div>
    );
  };
  
  export default Status;
  