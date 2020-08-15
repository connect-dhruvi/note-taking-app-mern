
Dhruvi Bhatt 


Note-Taking App having following functionalities:

- User can Login
- User can Register
- See Account Profile
- See Created Notes
- See Archieved / Trash Notes
- Create Notes 
- Update Notes
- Delete Notes
- Archieve Notes
- Trash Notes
- Unarchieve Notes
- Restore Notes From Trash
- Delete Notes forever From Trash

API-Calls

Users Links

- POST                           http://localhost:5000/user/register       DHRUVI
- POST                           http://localhost:5000/user/login          DHRUVI
- GET                            http://localhost:5000/user/authenticated  DHRUVI 

- GET                            http://localhost:5000/user/logout         SHIVAM
- PUT                            http://localhost:5000/user/update         SHIVAM

Notes Links

- POST FOR INSERT                http://localhost:5000/user/note           DHRUVI
- GET FOR GETTING ARCHIEVE NOTES http://localhost:5000/user/notes/archive  DHRUVI
- PUT FOR ARCHIEVE NOTES         http://localhost:5000/user/note/archive   DHRUVI
- PUT FOR TRASH NOTES            http://localhost:5000/user/note/trash     DHRUVI
- PUT                            http://localhost:5000/user/notes/update   DHRUVI

- GET                            http://localhost:5000/user/notes          SHIVAM
- DELETE                         http://localhost:5000/user/notes/delete   SHIVAM
- GET FOR GETTING TRASHED NOTES  http://localhost:5000/user/notes/trash    SHIVAM