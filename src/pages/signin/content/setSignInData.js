import { decrypt, encrypt } from '../../../utils/crypt';
import store from '../../../redux/store';
import { setUser } from '../../../redux/app';
import { isPlainObject } from 'lodash';
import { updateUser } from '../../../redux/user';
import channels from '../../../utils/channels';

export default function setSignInData (data) {
    const user = isPlainObject(data) ? {
        id: data.userId,
        token: data.token,
        email: data.userEmail,
        firstname: data.userFname,
        lastname: data.userLname,
        middlename: data.userMname || null,
        docTypes: data.docTypes,
        number: data.phoneCell,
        image: data.userImage,
        avatarUrl: data.userImage,
        grade: data?.userGrade?.grade,
        role: data?.userGrade?.role,
        auth: data?.auth,
    } : decrypt(data);
    const encryptUser = isPlainObject(data) ? encrypt(user) : data;
    store.dispatch(setUser(encryptUser));
    store.dispatch(updateUser({ 
            data: { 
            ...user, 
            connected : true 
        } 
    }));
    
    SIGN_IN_CHANNEL.postMessage(encryptUser, window.location.origin);
}

const SIGN_IN_CHANNEL = new BroadcastChannel(channels.signin);
