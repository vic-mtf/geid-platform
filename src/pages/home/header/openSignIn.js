import store from "../../../redux/store";
import { decrypt } from "../../../utils/crypt";
import openNewWindow from "../../../utils/openNewWindow";

export default function openSignIn () {
    const localUser = store.getState().app.user;
    const userSave = localUser && decrypt(localUser);
    openNewWindow({
        url: `/account/signin/${userSave ? 'userfound' : 'useremail'}`,
    }).name = 'signin';
}