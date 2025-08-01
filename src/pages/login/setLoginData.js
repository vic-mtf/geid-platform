import { decrypt, encrypt } from "../../utils/crypt";
import store from "../../redux/store";
import { updateApp } from "../../redux/app";
import { isPlainObject } from "lodash";
import { updateUser } from "../../redux/user";
import { LOGIN_CHANNEL } from "../../utils/broadcastChannel";

const setLoginData = (data) => {
  const user = isPlainObject(data) ? data : decrypt(data);
  const encryptUser = isPlainObject(data) ? encrypt(data) : data;

  store.dispatch(updateApp({ data: { user: { data: encryptUser } } }));
  store.dispatch(
    updateUser({
      data: {
        ...user,
        connected: true,
      },
    })
  );
  LOGIN_CHANNEL.postMessage(encryptUser, window.location.origin);
  if (window.opener) window.close();
  else
    setTimeout(
      () => window.location.replace(window.location.origin.toString()),
      50
    );
};

export default setLoginData;
