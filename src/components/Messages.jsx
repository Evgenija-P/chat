const Messages = ({ messages, name }) => {
  return (
    <div className="flex flex-col gap-5 ">
      {messages.map(({ user, message }, index) => {
        const me = 'bg-purple-500';
        const users = 'bg-violet-700';
        const itsMe =
          user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = itsMe ? ` ${me}` : `${users}`;
        const classNamePositions = itsMe ? `flex-row-reverse` : ``;

        return (
          <div
            key={index}
            className={`auto-cols-max ${classNamePositions} gap-1 flex`}
          >
            <div>
              <span className={`flex px-1 ${classNamePositions}`}>
                {user.name}:
              </span>
              <div
                className={`px-2 py-1 rounded-lg flex flex-row-reverse ${className}`}
              >
                {message}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
