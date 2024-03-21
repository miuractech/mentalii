import React, { useEffect } from "react";
import Header from "./headers";
import { auth, messagesRef } from "./config";
import {
  addDoc,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatMessageProps, message } from "./types";
import { Button, Chip, Input } from "@mantine/core";
type Props = {};

export default function ChatPage({}: Props) {
  return (
    <div>
      <Header />
      <ChatRoom />
    </div>
  );
}

function ChatRoom() {
  const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));

  // Use the query with useCollectionData hook
  // @ts-ignore
  const [messages, loading, error] = useCollectionData<message>(messagesQuery, {
    idField: "id",
  });

  const [formValue, setFormValue] = React.useState("");

  const dummy = React.useRef<HTMLDivElement>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth && auth.currentUser && auth.currentUser;

    const uid = user && user.uid;
    const photoURL = user && user.photoURL;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
  };
  useEffect(() => {
    dummy.current && dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  return (
    <div className="px-2" >
      <main>
        <div>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </div>
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage} className="fixed bottom-4 z-20 max-w-md w-full" >
        <div className="flex gap-2 px-2">

        <Input
          className="flex-grow"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <Button size="sm" type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
}

// function ChatMessage(props: ChatMessageProps) {
//   const { text, uid, photoURL, emotion } = props.message;
//   const sent = auth.currentUser != null && uid === auth.currentUser.uid;
//   console.log(photoURL);

//   return (
//     <div
//       className={`flex  my-3 gap-2 items-center ${
//         sent ? "flex-row-reverse" : ""
//       }`}
//     >
//       <div>
//         <img
//           className="rounded-3xl max-w-10"
//           alt="avatar"
//           src={
//             sent
//               ? photoURL
//               : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671132.jpg"
//           }
//         />
//       </div>
//       <div>
//         {emotion && (
//           <Chip color="blue" variant="outline" > emotion : {emotion}</Chip>
//         )}
//         <p>{text}</p>
//       </div>
//     </div>
//   );
// }

function ChatMessage(props: ChatMessageProps) {
  const { text, uid, photoURL, emotion } = props.message;
  const sent = auth.currentUser != null && uid === auth.currentUser.uid;

  return (
    <div className={`flex my-3 gap-4 items-end ${sent ? "flex-row-reverse" : ""}`}>
      <img
        className="rounded-full h-10 w-10 object-cover"
        alt="avatar"
        src={
          sent
            ? photoURL || "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671132.jpg" // Fallback URL if photoURL is null
            : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671132.jpg"
        }
      />
      <div className={`flex flex-col max-w-2/3 ${sent ? "items-end" : "items-start"}`}>
        {emotion && (
          <div className="mb-1 text-sm font-medium py-1 px-2 bg-blue-100 text-blue-800 rounded-full">
            Emotion: {emotion}
          </div>
        )}
        <p className={`p-2 rounded-lg ${sent ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
          {text}
        </p>
      </div>
    </div>
  );
}
