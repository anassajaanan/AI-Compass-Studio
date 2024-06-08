import { FC, RefObject } from "react";

type MessageType = {
  id: string;
  role: string;
  content: string | string[];
};

type PropsType = {
  messages: MessageType[];
  chatParent: RefObject<HTMLUListElement>;
};

const Chat: FC<PropsType> = ({ messages, chatParent }) => {
  return (
    <div className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto w-[80%]">
      <ul
        ref={chatParent}
        className="h-1 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4"
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.role === "user" ? (
              <li className="flex flex-row">
                <div className="rounded-xl p-4 bg-background shadow-md flex">
                  <p className="text-primary">
                    {typeof msg.content === "string"
                      ? msg.content
                      : msg.content.join(", ")}
                  </p>
                </div>
              </li>
            ) : Array.isArray(msg.content) &&
              msg.content.some((item) => item.includes("https://")) ? (
              msg.content.length > 1 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {msg.content.map((item: string) => (
                    <div
                      key={item}
                      className="relative w-full overflow-hidden"
                      style={{ paddingTop: "75%" }}
                    >
                      <img
                        src={item}
                        alt={item}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <img
                  src={msg.content[0]}
                  alt={msg.content[0]}
                  height={300}
                  width={300}
                  className="object-cover w-full h-full"
                />
              )
            ) : (
              <li className="flex flex-row-reverse">
                <div className="rounded-xl p-4 bg-background shadow-md flex w-3/4">
                  <p className="text-primary">
                    {typeof msg.content === "string"
                      ? msg.content
                      : msg.content.join(", ")}
                  </p>
                </div>
              </li>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
