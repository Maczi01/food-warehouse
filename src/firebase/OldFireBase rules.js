// rules_version = '2';
// service cloud.firestore {
//     match /databases/{database}/documents {
//     match /{document=**} {
//         allow read, write;
//     }
//
//     // match /users/{userId} {
//     // 	allow create: if request.auth.uid !=null;
//     //   allow read: if request.auth.uid !=userId
//     // }
//
//     match /foodList/* {
//    		allow read, write: if request.auth.uid !=null;
//    	}
//    match /users/{uid}/** {
//    		allow read, write: if request.auth.uid !=null;
//    }
//
//   }
//
// }
//
