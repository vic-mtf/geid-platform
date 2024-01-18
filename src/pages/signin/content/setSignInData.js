import { keyBy, merge } from 'lodash';
import { encrypt } from '../../../utils/crypt';

export default function setSignInData (data) {
    const name = '_connected';
    const writeAuth = data?.auth?.readNWrite?.map(auth => ({
        type: auth,
        write: !!data?.auth?.readNWrite
        ?.find(_auth => _auth === auth),
    }));
    const readAuth = data?.auth?.readOnly?.map(auth => ({
        type: auth,
        write: !!data?.auth?.readOnly
        ?.find(_auth => _auth === auth),
    }));
    const user = encrypt({
        id: data.userId,
        token: data.token,
        email: data.userEmail,
        firstname: data.userFname,
        lastname: data.userLname,
        middlename: data.userMname || null,
        docTypes: data.docTypes,
        number: data.phoneCell,
        image: data.userImage || null,
        grade: data?.userGrade?.grade,
        role: data?.userGrade?.role,
        permissions: merge( 
            keyBy(writeAuth, 'type'), 
            keyBy(readAuth, 'type')
        ),
    });
    const customEvent = new CustomEvent(name, {
        detail: { user, name }
    });
    document.getElementById('root')
    .dispatchEvent(customEvent);
}