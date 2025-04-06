import { useState } from "react";
import { User } from "./models/entities/user";
import { UserInput } from "./models/dtos/user";
import { UserRepository } from "./repositories/UserRepository";
import axios from "axios";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const userRepository = new UserRepository(axios);

  const handleCreateClick = async () => {
    const input: UserInput = {
      username: (Math.random() + 1).toString(36).substring(7),
      password: (Math.random() + 1).toString(36).substring(7),
    };
    const user = await userRepository.create(input);

    setUser(user);
  };

  const handleReadClick = async () => {
    const user = await userRepository.read(
      "8d7aeb29-efb5-476f-89fc-cb57265de940"
    );

    setUser(user);
  };

  return (
    <>
      <p>Hello world.</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button
        type={"button"}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleCreateClick}
      >
        Create User
      </button>
      <button
        type={"button"}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleReadClick}
      >
        Get User
      </button>
    </>
  );
}

export default App;
