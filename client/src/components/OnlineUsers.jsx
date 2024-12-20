import { BsFillPersonFill } from "react-icons/bs";
const OnlineUsers = ({ onlineUsers, currentUser }) => {
  console.log("Here is online users ", onlineUsers);
  return (
    <div>
      <div className="online-users-h">
        Users <BsFillPersonFill />
      </div>
      <div className="o-u-container">
        {onlineUsers.map((usr) => {
          return (
            <div className="online-user" key={usr}>
              {usr === currentUser ? "Me" : usr}
              <p style={{ color: "#00FF00" }}>Online</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnlineUsers;
