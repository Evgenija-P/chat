const Messages = ({ messages, name }) => {
  return (
    <div>
      {messages.map(({ user, message }, index) => {
        const itsMe =
          user.name.trim().toLowerCase() === name.trim().toLowerCase();
        // const className = itsMe ? 'me' : 'user';
        return (
          <div key={index}>
            <span>{user.name}</span>
            <div>{message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
